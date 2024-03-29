import { ApiProperty } from '@nestjs/swagger';
import { unitEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
export class CreateLocationRequestBody {
  @ApiProperty({
    description: ' building id',
    example: uuidv4(),
  })
  @IsUUID()
  @IsNotEmpty()
  buildingId: string;

  @ApiProperty({
    description: 'parent id',
    example: uuidv4(),
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiProperty({
    description: 'name of location',
    example: 'Root location',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name: string;

  @ApiProperty({
    description: 'location number',
    example: 'lobby-b',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'location number is too long' })
  locationNumber: string;

  @ApiProperty({
    description: 'Area value',
    example: 100,
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @IsDecimal()
  areaValue: string;

  @ApiProperty({
    description: 'unit value',
    example: unitEnum.M2,
    enum: unitEnum,
  })
  @IsNotEmpty()
  @IsEnum(unitEnum)
  unit: unitEnum;
}
