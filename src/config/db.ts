import { MongooseModuleOptions } from '@nestjs/mongoose';
import { IMongoConfig } from '../models';
import { AppConfig } from './app';

export class MongoDBConnection {
  public static get mongoConfig(): IMongoConfig {
    const dbUrl: string = AppConfig.getEnvVar('DB_URL') || 'localhost';
    const dbPort: number =
      Number.parseInt(AppConfig.getEnvVar('DB_PORT') as string, 10) || 27017;
    const uri = `mongodb://${dbUrl}:${dbPort}`;
    const options: MongooseModuleOptions = {
      autoIndex: false, // whether to build Schema indexes (must be false in prod!)
      autoCreate: true,
      dbName: AppConfig.getEnvVar('DB_NAME'),
      minPoolSize: 10,
      maxPoolSize: 30,
      retryDelay: 5000,
    };

    return {
      uri,
      options,
    };
  }
}
