import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS konfigurieren um Anfragen von Port 5173 zu erlauben
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
