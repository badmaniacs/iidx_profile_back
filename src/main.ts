import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.enableCors({
    origin: [
      'https://pastainfo.xyz',
      'https://www.pastainfo.xyz',
      'https://pastainfo.vercel.app',
      'https://p.eagate.573.jp',
      'https://iidx-profile-front-git-dev-badmaniacs.vercel.app',
      'http://localhost:3001',
      'http://121.160.17.53:3000',
    ],
    credentials: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(3000);
}

bootstrap();
