import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'; // ✅ Correct import
import { TrafficModule } from './traffic/traffic.module';
import { PrismaService } from './prisma.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 300, // Cache duration in seconds
    }),
    TrafficModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
