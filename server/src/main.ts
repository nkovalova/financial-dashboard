import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('process.env.APP_PORT', process.env.APP_PORT);
  const port = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: false,
  });

  await app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}
bootstrap();

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught exception:', ${error}`);
});
