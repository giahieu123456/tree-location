import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateBuildingRequestBody {
  @ApiProperty({
    description: 'name of building',
    example: 'building',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name: string;
}
