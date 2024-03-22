import { Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SoftDeleteLocationCommand } from './softDeleteLocation.command';
import { SoftDeleteLocationRequestParam } from './softDeleteLocation.request-param';

@ApiTags('Location')
@Controller({
  path: 'location/soft-delete',
  version: '1',
})
export class SoftDeleteLocationEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'soft delete a location' })
  @Put(':id')
  update(@Param() { id }: SoftDeleteLocationRequestParam): Promise<void> {
    return this.commandBus.execute<SoftDeleteLocationCommand, void>(
      new SoftDeleteLocationCommand(id),
    );
  }
}
