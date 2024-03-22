import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBuildingCommand } from './createLocation.command';
import { CreateBuildingRequestBody } from './createLocation.request-body';

@ApiTags('building')
@Controller({
  path: 'building',
  version: '1',
})
export class CreateBuildingEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Creates a new building' })
  @Post()
  create(@Body() body: CreateBuildingRequestBody): Promise<void> {
    return this.commandBus.execute<CreateBuildingCommand, void>(
      new CreateBuildingCommand(body),
    );
  }
}
