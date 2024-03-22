import { ApiProperty } from '@nestjs/swagger';
import { Building } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
export class GetBuildingsResponse implements Building {
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
  data: GetBuildingsResponse[];
}
