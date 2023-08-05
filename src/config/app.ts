import { Logger, UnauthorizedException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { packageVersion } from '../constants';

import { IRateLimiter } from '../models';

// An array to hold URIs that will be communicating with this server
const baseUri: Readonly<Array<string>> = [];

export class AppConfig {
  // TODO: ideally, this should come from package.json
  public static get appName(): Readonly<string> {
    return 'Digital Products NestJS Scaffold';
  }

  public static get appVersion(): Readonly<string> {
    return packageVersion;
  }

  public static get baseUri(): Readonly<Array<string>> {
    return baseUri;
  }

  public static get corsSettings(): Readonly<CorsOptions> {
    return {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
      origin: (origin: string | undefined, callback): void => {
        if (
          AppConfig.allowCors ||
          origin === undefined ||
          baseUri.includes(origin)
        ) {
          return callback(null, true);
        }

        Logger.warn(`origin '${origin}' was blocked by CORS policy.`);

        return callback(
          new UnauthorizedException({
            statusCode: 401,
            message: 'Your request was blocked by CORS policy.',
          })
        );
      },
    };
  }

  public static get allowCors(): boolean {
    return AppConfig.getEnvVar('ALLOW_CORS') === 'true';
  }

  public static get trustProxy(): boolean {
    return AppConfig.getEnvVar('TRUST_PROXY') === 'true';
  }

  public static get port(): number {
    return Number.parseInt(AppConfig.getEnvVar('PORT') as string, 10) || 3000;
  }

  public static get rateLimiter(): IRateLimiter {
    return {
      maxRequests:
        Number.parseInt(AppConfig.getEnvVar('MAX_REQUESTS') as string, 10) ||
        300,
      ttl:
        Number.parseInt(
          AppConfig.getEnvVar('RATE_WINDOW_SECONDS') as string,
          10
        ) || 1800,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static getEnvVar(key: any): string | undefined {
    if (!key || typeof key !== 'string') {
      Logger.log(
        `environment variable`,
        JSON.stringify(key),
        `is not a string, returning undefined`
      );

      return undefined;
    }

    // eslint-disable-next-line security/detect-object-injection
    return process.env[key];
  }
}
