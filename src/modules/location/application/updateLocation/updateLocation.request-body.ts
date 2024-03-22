import { ApiProperty } from '@nestjs/swagger';
import { Prisma, unitEnum } from '@prisma/client';
import {
  IsDecimal,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateLocationRequestBody {
  @ApiProperty({
    description: 'name of location',
    example: 'Root location',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name?: string;

  @ApiProperty({
    description: 'location number',
    example: 'lobby-b',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'location number is too long' })
  locationNumber?: string;

  @ApiProperty({
    description: 'Area value',
    example: 100,
  })
  @IsOptional()
  @IsDecimal()
  areaValue?: Prisma.Decimal;

  @ApiProperty({
    description: 'unit value',
    example: unitEnum.M2,
    enum: unitEnum,
  })
  @IsOptional()
  @IsEnum(unitEnum)
  unit?: unitEnum;
}
