import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DEVELOPMENT_ENVIRONMENT } from './environments/development.environments';
import { Connection } from 'mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ContactModule } from './modules/contact/contact.module';

let mongoURL = `mongodb://${DEVELOPMENT_ENVIRONMENT.MONGO_USERNAME}:${DEVELOPMENT_ENVIRONMENT.MONGO_PASSWORD}@${DEVELOPMENT_ENVIRONMENT.MONGO_HOST_1}:${DEVELOPMENT_ENVIRONMENT.MONGO_PORT},${DEVELOPMENT_ENVIRONMENT.MONGO_HOST_2}:${DEVELOPMENT_ENVIRONMENT.MONGO_PORT},${DEVELOPMENT_ENVIRONMENT.MONGO_HOST_3}:${DEVELOPMENT_ENVIRONMENT.MONGO_PORT}/?ssl=true&replicaSet=atlas-1z9oli-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoURL, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('Connected to MongoDB: ', new Date()));
        return connection;
      }
    }),
    AuthenticationModule,
    UserModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
