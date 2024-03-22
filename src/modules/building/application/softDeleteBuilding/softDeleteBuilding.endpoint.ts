import { Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SoftDeleteBuildingCommand } from './softDeleteBuilding.command';
import { SoftDeleteBuildingRequestParam } from './softDeleteBuilding.request-param';

@ApiTags('building')
@Controller({
  path: 'building/soft-delete',
  version: '1',
})
export class SoftDeleteBuildingEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'soft delete a building' })
  @Put(':id')
  update(@Param() { id }: SoftDeleteBuildingRequestParam): Promise<void> {
    return this.commandBus.execute<SoftDeleteBuildingCommand, void>(
      new SoftDeleteBuildingCommand(id),
    );
  }
}
