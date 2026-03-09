import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);

  process.on('SIGTERM', async () => {
  await app.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await app.close();
  process.exit(0);
});
}

bootstrap();
