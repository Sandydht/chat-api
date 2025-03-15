import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEVELOPMENT_ENVIRONMENT } from './environments/development.environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*'
    }
  });
  await app.listen(DEVELOPMENT_ENVIRONMENT.PORT ?? 3000);
}
bootstrap();
