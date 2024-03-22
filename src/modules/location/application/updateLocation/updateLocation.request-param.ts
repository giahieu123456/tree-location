import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateLocationRequestParam {
  @ApiProperty({
    description: 'location Id',
    example: '',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
