import { ApiProperty } from '@nestjs/swagger';

export class CountryTrafficDto {
  @ApiProperty({ example: 'USA', description: 'Country name' })
  country: string;

  @ApiProperty({ example: 5000, description: 'Traffic count' })
  count: number;
}

export class VehicleTypeDto {
  @ApiProperty({ example: 'Car', description: 'Type of vehicle' })
  vehicleType: string;

  @ApiProperty({ example: 3000, description: 'Traffic count' })
  count: number;
}
