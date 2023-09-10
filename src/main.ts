import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const expressApp = express();

  expressApp.use(express.json({ limit: '50mb' }));
  expressApp.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.use(expressApp);

  app.enableCors({
    origin: [
      'https://pastainfo.xyz',
      'https://www.pastainfo.xyz',
      'https://pastainfo.vercel.app',
    ],
    credentials: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(3000);
}

bootstrap();
