import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateBuildingCommand } from './updateBuilding.command';
import { UpdateBuildingRequestBody } from './updateLegalDoc.request-body';
import { UpdateBuildingRequestParam } from './updateLegalDoc.request-param';

@ApiTags('building')
@Controller({
  path: 'building',
  version: '1',
})
export class UpdateBuildingEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Update a building' })
  @Put(':id')
  update(
    @Param() { id }: UpdateBuildingRequestParam,
    @Body() body: UpdateBuildingRequestBody,
  ): Promise<void> {
    return this.commandBus.execute<UpdateBuildingCommand, void>(
      new UpdateBuildingCommand(id, body),
    );
  }
}
