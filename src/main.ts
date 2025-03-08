import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  }); // ✅ Enable logging

  // ✅ Ensure HttpAdapterHost is retrieved after NestJS is created
  const httpAdapterHost = app.get(HttpAdapterHost);

  // ✅ Now apply the exception filter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Traffic Data API')
    .setDescription('API for fetching traffic data statistics')
    .setVersion('1.0')
    .addTag('Traffic')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // ✅ Enable CORS with default settings
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
