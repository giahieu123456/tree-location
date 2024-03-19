import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLocationCommand } from './createLocation.command';
import { CreateLocationRequestBody } from './createLocation.request-body';

@ApiTags('Location')
@ApiBearerAuth()
@Controller({
  path: 'locations',
  version: '1',
})
export class CreateLocationEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Creates a new location' })
  @Post()
  create(@Body() body: CreateLocationRequestBody): Promise<void> {
    return this.commandBus.execute<CreateLocationCommand, void>(
      new CreateLocationCommand(body),
    );
  }
}
