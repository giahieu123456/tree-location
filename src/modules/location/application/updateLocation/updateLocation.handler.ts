import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/database';
import { UpdateLocationCommand } from './updateLocation.command';
import { UpdateLocationRequestBody } from './updateLocation.request-body';

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationHandler {
  constructor(private readonly dbContext: PrismaService) {}
  private readonly logger = new Logger('location');
  public async execute(command: UpdateLocationCommand): Promise<void> {
    await this.updateBuilding(command.body, command.id);
  }

  async updateBuilding(
    data: UpdateLocationRequestBody,
    id: string,
  ): Promise<void> {
    const { name, areaValue, unit, locationNumber } = data;

    await this.dbContext.location.findFirstOrThrow({
      where: {
        id,
      },
    });

    const location = await this.dbContext.location.update({
      where: {
        id,
      },
      data: {
        name,
        areaValue,
        unit,
        locationNumber,
      },
    });
    this.logger.log({ location }, 'created location record');
  }
}
