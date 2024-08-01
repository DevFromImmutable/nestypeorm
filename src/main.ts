import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // You might want to restrict this to specific domains in production
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log('server running on port: 3000');
}
bootstrap();
