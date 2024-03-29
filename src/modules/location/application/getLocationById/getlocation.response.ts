import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Building, Location } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';
export class GetLocationsResponse {
  parent: LocationResponse;
  allChildrens?: LocationResponse[];
}
export class LocationResponse implements Location {
  @ApiProperty({
    description: 'Location number',
    example: 'A-01',
  })
  locationNumber: string;

  @ApiProperty({
    description: 'area value',
    example: '100.00',
  })
  areaValue: Decimal;

  @ApiProperty({
    description: 'unit',
    example: $Enums.unitEnum.M2,
  })
  unit: $Enums.unitEnum;

  @ApiProperty({
    description: 'building id',
    example: uuidv4(),
  })
  buildingId: string;

  @ApiProperty({
    description: 'building id',
    example: uuidv4(),
  })
  building?: Building;

  level: number;
  parentId: string;
  @ApiProperty({
    description: 'building id',
    example: uuidv4(),
  })
  id: string;
  @ApiProperty({
    description: 'created date',
    example: new Date().toISOString(),
  })
  createdAt: Date;
  @ApiProperty({
    description: 'updated date',
    example: new Date().toISOString(),
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'name of building',
    example: 'building A',
  })
  name: string;

  @ApiProperty({
    description: 'is deleted',
    example: false,
  })
  isDelete: boolean;
}
