import { CommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/database';
import { SoftDeleteBuildingCommand } from './softDeleteBuilding.command';

@CommandHandler(SoftDeleteBuildingCommand)
export class SoftDeleteBuildingHandler {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: SoftDeleteBuildingCommand): Promise<void> {
    await this.updateBuilding(command.id);
  }

  async updateBuilding(id: string): Promise<void> {
    await this.dbContext.building.findFirstOrThrow({
      where: {
        id,
      },
    });

    await this.dbContext.$transaction(async (trx) => {
      await trx.building.update({
        where: {
          id,
        },
        data: {
          isDelete: true,
        },
      });

      await trx.location.updateMany({
        where: {
          buildingId: id,
        },
        data: {
          isDelete: true,
        },
      });
    });
  }
}
