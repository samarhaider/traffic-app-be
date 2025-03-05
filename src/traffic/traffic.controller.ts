import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrafficService } from './traffic.service';
import { CountryTrafficDto, VehicleTypeDto } from './dto/traffic.dto';

@ApiTags('Traffic')
@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get('countries')
  @ApiOperation({ summary: 'Get traffic data by country' })
  @ApiResponse({ status: 200, description: 'Returns traffic data grouped by country', type: [CountryTrafficDto] })
  async getCountryTraffic() {
    return this.trafficService.getCountryTraffic();
  }

  @Get('vehicle-types')
  @ApiOperation({ summary: 'Get vehicle type distribution' })
  @ApiResponse({ status: 200, description: 'Returns traffic data grouped by vehicle type', type: [VehicleTypeDto] })
  async getVehicleTypeDistribution() {
    return this.trafficService.getVehicleTypeDistribution();
  }
}
