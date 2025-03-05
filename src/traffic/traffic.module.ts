import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { PrismaService } from '../prisma.service';
import { CacheModule as RedisCache } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    RedisCache.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [TrafficController],
  providers: [TrafficService, PrismaService],
})
export class TrafficModule {}
