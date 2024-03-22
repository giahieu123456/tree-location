import { CommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/database';
import { UpdateBuildingCommand } from './updateBuilding.command';
import { UpdateBuildingRequestBody } from './updateLegalDoc.request-body';

@CommandHandler(UpdateBuildingCommand)
export class UpdateBuildingHandler {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: UpdateBuildingCommand): Promise<void> {
    await this.updateBuilding(command.body, command.id);
  }

  async updateBuilding(
    data: UpdateBuildingRequestBody,
    id: string,
  ): Promise<void> {
    const { name } = data;

    await this.dbContext.building.findFirstOrThrow({
      where: {
        id,
      },
    });

    await this.dbContext.building.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
