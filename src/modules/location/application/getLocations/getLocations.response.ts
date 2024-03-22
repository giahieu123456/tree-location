import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Building, Location } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';
export class GetLocationsResponse implements Location {
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
  building: Building;

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

export class GetBuildingsQueryResponse {
  @ApiProperty({
    description: 'take',
    example: 10,
  })
  skip?: number;

  @ApiProperty({
    description: 'total',
    example: 10,
  })
  total?: number;

  @ApiProperty({
    description: 'skip',
    example: 0,
  })
  take?: number;
  @ApiProperty({
    description: 'List of building',
    isArray: true,
    example: [],
  })
  data: GetLocationsResponse[];
}
