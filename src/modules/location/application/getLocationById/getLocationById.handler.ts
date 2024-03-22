import { QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/database';
import { GetLocationsResponse } from '../getLocations/getLocations.response';
import { GetBuildingsQuery } from './getLocationById.query';

@QueryHandler(GetBuildingsQuery)
export class GetLocationByIdHandler {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(
    query: GetBuildingsQuery,
  ): Promise<GetLocationsResponse> {
    return this.getLocation(query.id);
  }

  private async getLocation(id: string): Promise<GetLocationsResponse> {
    return await this.dbContext.location.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        building: true,
        childrens: true,
      },
    });
  }
}
