import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TrafficController],
  providers: [TrafficService, PrismaService],
})
export class TrafficModule {}
