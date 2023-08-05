import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';
import helmet, { contentSecurityPolicy } from 'helmet';
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as MongoStore from 'connect-mongo';

import { AppModule } from './app.module';
import { AppConfig, MongoDBConnection } from './config';

async function bootstrap(): Promise<void> {
  const globalPrefix = 'api';
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: AppConfig.corsSettings,
  });

  // warn if Cross Origin requests (cors) are allowed
  if (AppConfig.allowCors) {
    Logger.warn('Cross Origin Enabled.');
  }

  // enable when we are behind a reverse proxy (AWS if we use an ELB, custom Nginx setup, etc.)
  if (AppConfig.trustProxy) {
    app.set('trust proxy', 1);
    Logger.log('Trust proxy enabled.');
  }

  app.use(helmet());
  app.use(compression());
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: AppConfig.getEnvVar('SESSION_SECRET') as string,
      store: MongoStore.create({
        mongoUrl: MongoDBConnection.mongoConfig.uri,
        dbName: MongoDBConnection.mongoConfig.options.dbName,
        collectionName: 'sessions',
        autoRemove: 'native',
      }),
    })
  );

  app.use(
    contentSecurityPolicy({
      directives: {
        baseUri: AppConfig.baseUri,
        blockAllMixedContent: [], // === true
        connectSrc: ["'self'"],
        defaultSrc: ["'none'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        mediaSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: [], // === false
      },
    })
  );

  // Ask NestJS to try and transform the payloads to their corresponding class.
  // The pipe will also convert strings to primitive types (e.g., number, boolean)
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.setHeader('X-Powered-By', 'Digital Products, Part of Accenture Song');
    next();
  });

  // Create OpenAPI specs (via Swagger UI)
  // Please note that the order of the `addServer` method dictates the
  // order in which the options will appear in the `Servers` dropdown
  const openApiConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(AppConfig.appName)
    .setDescription(`OpenAPI specs of the ${AppConfig.appName} API`)
    .setVersion(AppConfig.appVersion)
    .addServer(
      `http://localhost:${AppConfig.port}/${globalPrefix}/v1`,
      'API v1 routes'
    )
    .addServer(
      `http://localhost:${AppConfig.port}/${globalPrefix}/v0`,
      'API v0 routes (mock routes)'
    )
    .build();
  const openApiDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    openApiConfig
  );
  SwaggerModule.setup('docs/api', app, openApiDocument);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix(globalPrefix);
  await app.init();
  await app.listen(3000);
  Logger.log(`🚀 Application is running on ${AppConfig.port}/${globalPrefix}`);
}
bootstrap();
