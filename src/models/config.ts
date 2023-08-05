import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface IMongoConfig {
  uri: string;
  options: MongooseModuleOptions;
}

export interface IRateLimiter {
  maxRequests: number;
  ttl: number;
}
