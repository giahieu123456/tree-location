import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Location } from '@prisma/client';
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
    const { buildingId, name, locationNumber, areaValue, unit, parentId } =
      data;
    await this.dbContext.building.findFirstOrThrow({
      where: {
        id: buildingId,
        isDelete: false,
      },
    });
    let parentLocation: Location;
    if (parentId) {
      parentLocation = await this.dbContext.location.findFirstOrThrow({
        where: {
          id: parentId,
          isDelete: false,
        },
      });
    } else {
      parentLocation = await this.dbContext.location.findFirst({
        where: {
          parentId: null,
          isDelete: false,
        },
      });
      if (parentLocation) {
        throw new BadRequestException('The Root location already exist');
      }
    }

    const location = await this.dbContext.location.create({
      data: {
        name,
        locationNumber,
        areaValue,
        unit,
        buildingId,
        parentId,
        level: parentLocation ? parentLocation.level + 1 : 0,
      },
    });

    this.logger.log({ location }, 'created location record');
  }
}
