import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:4200,https://masce.ddns.net',
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Thesis API')
    .setDescription('Email-less authentication model proposal using OAuth 2.0')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Thesis API',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
