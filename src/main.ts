import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS TypeORM')
    .setDescription('The NESTJS API description')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api/v1', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.enableCors({
    origin: [process.env.WHITE_URL],
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  const port = Number(process.env.APPLICATION_PORT) || 3333;
  await app.listen(port);
  console.log(`server running on port: ${port}`);
}

bootstrap();
