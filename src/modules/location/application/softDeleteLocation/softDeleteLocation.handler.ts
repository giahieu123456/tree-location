import { Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/database';
import { SoftDeleteLocationCommand } from './softDeleteLocation.command';
type trx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

type location = {
  id: string;
  childrens: {
    id: string;
  }[];
};
@CommandHandler(SoftDeleteLocationCommand)
export class SoftDeleteLocationHandler {
  constructor(private readonly dbContext: PrismaService) {}
  private readonly logger = new Logger('location');
  public async execute(command: SoftDeleteLocationCommand): Promise<void> {
    await this.updateLocation(command.id);
  }

  async updateLocation(id: string): Promise<void> {
    const location = await this.dbContext.location.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        childrens: {
          select: {
            id: true,
            isDelete: false,
          },
        },
      },
    });

    await this.dbContext.$transaction(async (trx) => {
      const locationUpdated = await trx.location.update({
        where: {
          id,
        },
        data: {
          isDelete: true,
        },
      });
      this.logger.log({ locationUpdated }, 'soft delete location');
      await this.deleteAllChildrenInTree(
        location.childrens.map((item) => item.id),
        trx,
      );
    });
  }

  async deleteAllChildrenInTree(locationIds: string[], trx: trx) {
    if (locationIds.length > 0) {
      const locationsUpdated = await trx.location.updateMany({
        where: {
          id: {
            in: locationIds,
          },
        },
        data: {
          isDelete: true,
        },
      });
      this.logger.log({ locationsUpdated }, 'soft delete locations');
      const locations = await trx.location.findMany({
        where: {
          id: {
            in: locationIds,
          },
          isDelete: false,
        },
        select: {
          id: true,
          childrens: {
            select: {
              id: true,
              isDelete: false,
            },
          },
        },
      });
      let ChildLocationIds: string[] = [];
      locations.forEach((location) => {
        ChildLocationIds = ChildLocationIds.concat(
          location.childrens.map((child) => child.id),
        );
      });
      this.deleteAllChildrenInTree(ChildLocationIds, trx);
    }
  }
}
