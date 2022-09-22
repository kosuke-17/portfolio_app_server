import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// applicationの作成
export const createApp = async () => {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document: OpenAPIObject = createSwagger(app);
  SwaggerModule.setup('api/swagger', app, document);
  app.enableCors();

  return app;
};

// swaggerの作成
export const createSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('portfolio_app 仕様書').build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  return document;
};
