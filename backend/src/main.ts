import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Configuration CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:4200',
    ],
    credentials: true,
  });

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Préfixe global pour l'API
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 0;
  await app.listen(port, '0.0.0.0');
  const actualPort =
    Number(process.env.PORT) ||
    (typeof port === 'number' ? port : Number(port) || 3000);

  logger.log(
    `🚀 Application démarrée sur http://localhost:${actualPort}/api/v1`,
  );
  logger.log(`📊 Health check: http://localhost:${actualPort}/api/v1/health`);
  logger.log(`🔌 Port utilisé: ${actualPort}`);
}

bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error("❌ Échec du démarrage de l'application:", err);
  process.exit(1);
});
