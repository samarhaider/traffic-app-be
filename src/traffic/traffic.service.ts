import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrafficService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCountryTraffic() {
    const cacheKey = 'country-traffic';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const data = await this.prisma.traffic.groupBy({
      by: ['country'],
      _sum: { count: true },
    });

    await this.cacheManager.set(cacheKey, data, 300); // ✅ Corrected TTL
    return data;
  }

  async getVehicleTypeDistribution() {
    const cacheKey = 'vehicle-type-distribution';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const data = await this.prisma.traffic.groupBy({
      by: ['vehicleType'],
      _sum: { count: true },
    });

    await this.cacheManager.set(cacheKey, data, 300); // ✅ Corrected TTL
    return data;
  }
}
