import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateLocationCommand } from './updateLocation.command';
import { UpdateLocationRequestBody } from './updateLocation.request-body';
import { UpdateLocationRequestParam } from './updateLocation.request-param';

@ApiTags('Location')
@Controller({
  path: 'location',
  version: '1',
})
export class UpdateBuildingEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Update a location' })
  @Put(':id')
  update(
    @Param() { id }: UpdateLocationRequestParam,
    @Body() body: UpdateLocationRequestBody,
  ): Promise<void> {
    return this.commandBus.execute<UpdateLocationCommand, void>(
      new UpdateLocationCommand(id, body),
    );
  }
}
