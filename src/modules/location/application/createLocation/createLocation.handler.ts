import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/database';
import { CreateLocationCommand } from './createLocation.command';
import { CreateLocationRequestBody } from './createLocation.request-body';

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler {
  private readonly logger = new Logger('location');
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: CreateLocationCommand): Promise<void> {
    await this.createLocation(command.body);
  }

  private async createLocation(data: CreateLocationRequestBody): Promise<void> {
    const {} = data;
    const building = await this.dbContext.location.findMany();
    console.log(building);
    this.logger.log({ building }, 'created location record');
  }
}
