import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 5454;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Para ativar a validação com o class-transform e class-validator
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
