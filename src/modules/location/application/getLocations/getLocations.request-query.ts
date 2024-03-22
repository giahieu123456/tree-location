import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
export enum OrderBuildingEnum {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}
export class GetLocationsRequestQuery {
  @ApiPropertyOptional({
    description: 'take',
    example: 10,
  })
  @IsOptional()
  @IsNumberString()
  take?: string;

  @ApiPropertyOptional({
    description: 'skip',
    example: 0,
  })
  @IsOptional()
  @IsNumberString()
  skip?: string;

  @ApiPropertyOptional({
    description: 'Search by keyword',
    example: 'Test',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'order by keyword',
    example: OrderBuildingEnum.UPDATED_AT,
    enum: OrderBuildingEnum,
  })
  @IsOptional()
  @IsEnum(OrderBuildingEnum)
  order?: OrderBuildingEnum = OrderBuildingEnum.UPDATED_AT;

  @ApiPropertyOptional({
    description: 'value order by',
    example: Prisma.SortOrder.desc,
    enum: Prisma.SortOrder,
  })
  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  valueOrder?: Prisma.SortOrder = Prisma.SortOrder.desc;

  @ApiPropertyOptional({
    description: 'order by keyword',
    example: [],
  })
  @IsOptional()
  @IsArray()
  buildingsId?: string[];
}
