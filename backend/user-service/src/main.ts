import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('SERVICE_PORT') || 3000;
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  await app.listen(port);
  console.log(`🚀 User-Service running on port ${port}`);
}
void bootstrap();
