import { QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/database';
import { GetBuildingsQuery } from './getLocationById.query';
import { GetLocationsResponse, LocationResponse } from './getlocation.response';

@QueryHandler(GetBuildingsQuery)
export class GetLocationByIdHandler {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(
    query: GetBuildingsQuery,
  ): Promise<GetLocationsResponse> {
    return this.getLocation(query.id);
  }

  private async getLocation(id: string): Promise<GetLocationsResponse> {
    const parentLocation = await this.dbContext.location.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        building: true,
        childrens: true,
      },
    });

    const result = parentLocation.childrens;
    const childrends = await this.getChildrens(result.map((item) => item.id));
    return {
      parent: parentLocation,
      allChildrens: childrends,
    };
  }

  private async getChildrens(
    locationIds: string[],
  ): Promise<LocationResponse[]> {
    let result: LocationResponse[] = [];
    if (locationIds.length > 0) {
      const locations = await this.dbContext.location.findMany({
        where: {
          id: {
            in: locationIds,
          },
        },
        include: {
          childrens: true,
        },
      });
      result = [...result, ...locations];
      let childrenIds: string[] = [];
      locations.forEach((item) => {
        childrenIds = [
          ...childrenIds,
          ...item.childrens.map((child) => child.id),
        ];
      });
      if (childrenIds) {
        const grandchildrens = await this.getChildrens(childrenIds);
        result = [...result, ...grandchildrens];
      }
    }
    return result;
  }
}
