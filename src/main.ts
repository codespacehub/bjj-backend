import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('BJJ Stars')
    .setDescription(
      'Projeto criado com o objetivo de trazer o controle de presença e alunos das academias',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .setLicense(
      'MIT License',
      'https://github.com/nestjs/swagger/blob/master/LICENSE',
    )
    .setContact(
      'Support Nitro',
      'https://support.nitrodesenvolvimento.com.br',
      'support@nitrodesenvolvimento.com.br',
    )
    .addServer('http://localhost:5454')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customfavIcon: '/docs/logo.svg',
    customSiteTitle: 'BJJ Stars | Docs',
    customCss: `
    .topbar-wrapper img {content:url(\'/docs/logo.svg\'); height: 90px; object-fit: contain}
    .swagger-ui .topbar { background-color: #4562B1; } `,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useStaticAssets(join(__dirname, '..', 'docs'), { prefix: '/docs' });

  await app.listen(port);
}
bootstrap();
