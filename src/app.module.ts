import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ContactModule } from './modules/contact/contact.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import databaseConfig from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE.MONGO_URI'),
        onConnectionCreate: (connection: Connection) => {
          const databaseLogger = new Logger('Database');
          connection.on('connected', () => databaseLogger.log('connected'));
          connection.on('open', () => databaseLogger.log('open'));
          connection.on('disconnected', () => databaseLogger.log('disconnected'));
          connection.on('reconnected', () => databaseLogger.log('reconnected'));
          connection.on('disconnecting', () => databaseLogger.log('disconnecting'));
          return connection;
        }
      })
    }),
    AuthenticationModule,
    UserModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
