import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './persistence/seed.service';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const seedService = app.get(SeedService);
  await seedService.seed();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
