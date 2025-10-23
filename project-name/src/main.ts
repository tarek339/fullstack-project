import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS konfigurieren um Anfragen von Port 5173 zu erlauben
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost',
      'http://localhost:80',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
      'X-Requested-With',
    ],
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
