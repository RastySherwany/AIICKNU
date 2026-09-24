import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Serve uploads folder as static files
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
