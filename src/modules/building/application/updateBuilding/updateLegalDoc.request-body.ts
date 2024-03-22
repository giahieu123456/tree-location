import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateBuildingRequestBody {
  @ApiProperty({
    description: 'name',
    example: 'name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;
}
