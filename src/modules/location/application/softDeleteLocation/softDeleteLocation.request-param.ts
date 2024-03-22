import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SoftDeleteLocationRequestParam {
  @ApiProperty({
    description: 'building Id',
    example: '',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
