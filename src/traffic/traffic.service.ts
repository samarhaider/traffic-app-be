import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrafficService {
  constructor(private readonly prisma: PrismaService) {}

  async getCountryTraffic() {
    const data = await this.prisma.traffic.groupBy({
      by: ['country'],
      _sum: { count: true },
    });
    return data.map((item) => ({
      country: item.country,
      count: item._sum.count,
    }));
    return data;
  }

  async getVehicleTypeDistribution() {
    const data = await this.prisma.traffic.groupBy({
      by: ['vehicleType'],
      _sum: { count: true },
    });

    return data.map((item) => ({
      vehicleType: item.vehicleType,
      count: item._sum.count,
    }));
    return data;
  }
}
