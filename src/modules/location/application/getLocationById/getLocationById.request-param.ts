import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetLocationByIdRequestParam {
  @ApiProperty({
    description: 'location Id',
    example: '',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
