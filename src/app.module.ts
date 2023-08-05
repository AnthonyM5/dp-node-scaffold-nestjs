import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import { StripeCoreModule } from 'nestjs-stripe/lib/StripeCoreModule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig, MongoDBConnection } from './config';
import { stripeVersion } from './constants';
import { SharedModule } from './shared/shared.module';
import { CategoriesModule } from './features/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'qa', 'staging', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        MAX_REQUESTS: Joi.number().default(300),
        RATE_WINDOW_SECONDS: Joi.number().default(1800),
        SESSION_SECRET: Joi.string().required(),
        DB_URL: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(27017),
        DB_NAME: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(
      MongoDBConnection.mongoConfig.uri,
      MongoDBConnection.mongoConfig.options
    ),
    ThrottlerModule.forRoot({
      ttl: AppConfig.rateLimiter.ttl,
      limit: AppConfig.rateLimiter.maxRequests,
    }),
    StripeCoreModule.forRoot({
      apiKey: AppConfig.getEnvVar('STRIPE_SECRET_KEY') as string,
      apiVersion: stripeVersion as any, // need to cast the version as any, for more info please see https://github.com/stripe/stripe-node#usage-with-typescript
    }),
    SharedModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
