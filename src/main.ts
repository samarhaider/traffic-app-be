import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get instances from Nest's DI container
  const cacheManager = app.get<Cache>(CACHE_MANAGER);
  const reflector = app.get(Reflector);

  // Pass Reflector as the first argument, CacheManager as the second
  app.useGlobalInterceptors(new CacheInterceptor(cacheManager, reflector));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Traffic Data API')
    .setDescription('API for fetching traffic data statistics')
    .setVersion('1.0')
    .addTag('Traffic')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();
