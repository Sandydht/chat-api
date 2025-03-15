import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEVELOPMENT_ENVIRONMENT } from './environments/development.environments';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*'
    }
  });

  app.use(session({
    secret: DEVELOPMENT_ENVIRONMENT.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(DEVELOPMENT_ENVIRONMENT.PORT ?? 3000);
}
bootstrap();
