import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { AppModule } from './app.module';
// import { isDev } from './lib/checkEnv';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // http://localhost:3031/apiのようにdefault
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // if (isDev) {
  const config = new DocumentBuilder()
    .setTitle('portfolio_app ドキュメント')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  // }
  app.enableCors();

  // if (isDev) {
  await writeFile('./swagger.json', JSON.stringify(document, null, '  '));
  // }

  await app.listen(3031);
}
bootstrap();
