import { Module } from '@nestjs/common';
import { TrafficModule } from './traffic/traffic.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TrafficModule],
  providers: [PrismaService],
})
export class AppModule {}
