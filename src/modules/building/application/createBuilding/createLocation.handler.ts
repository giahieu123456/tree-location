import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/database';
import { CreateBuildingCommand } from './createLocation.command';
import { CreateBuildingRequestBody } from './createLocation.request-body';

@CommandHandler(CreateBuildingCommand)
export class CreateLocationHandler {
  private readonly logger = new Logger('building');
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: CreateBuildingCommand): Promise<void> {
    await this.createLocation(command.body);
  }

  private async createLocation(data: CreateBuildingRequestBody): Promise<void> {
    const { name } = data;

    const building = await this.dbContext.building.create({
      data: {
        name,
      },
    });

    this.logger.log({ building }, 'created building record');
  }
}
