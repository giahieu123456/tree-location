import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TransFormNullValue } from 'src/common/decorators/transformNullValue.decorator';

export class CreateLocationRequestBody {
  @ApiProperty({
    description: 'time zone id',
    example: 1,
  })
  @TransFormNullValue()
  @IsOptional()
  timezoneId?: string;
}
