import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DEVELOPMENT_ENVIRONMENT } from './environments/development.environments';
import { Connection } from 'mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

let mongoURL = `mongodb+srv://${DEVELOPMENT_ENVIRONMENT.MONGO_USERNAME}:${DEVELOPMENT_ENVIRONMENT.MONGO_PASSWORD}@${DEVELOPMENT_ENVIRONMENT.MONGO_HOST}/${DEVELOPMENT_ENVIRONMENT.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoURL, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('Connected to MongoDB: ', new Date()));
        return connection
      }
    }),
    AuthenticationModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
