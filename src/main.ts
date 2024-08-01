import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('NestJS TypeORM')
    .setDescription('The NESTJS API description')
    .setVersion('1.0')
    .addTag('TypeORM based application with NestJS and Postgres Database')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'BEARER',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT_AUTH',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup('api/v1', app, document);

  app.enableCors({
    origin: [process.env.WHITE_URL],
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = Number(process.env.APPLICATION_PORT) || 3333;
  await app.listen(port);
  console.log(`server running on port: ${port}`);
}

bootstrap();
