import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(3000);
=======

  app.enableCors({
    origin: 'http://localhost:3001', // frontend URL
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
>>>>>>> bc93bb1031f82fbd76dd90d7cbfbbd977fa7ca79
}
bootstrap();