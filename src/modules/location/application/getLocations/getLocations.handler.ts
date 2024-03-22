import { QueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database';
import { GetBuildingsQuery } from './getLocations.query';
import { GetLocationsRequestQuery } from './getLocations.request-query';
import {
  GetBuildingsQueryResponse,
  GetLocationsResponse,
} from './getLocations.response';

@QueryHandler(GetBuildingsQuery)
export class GetAllLegalDocHandler {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(
    query: GetBuildingsQuery,
  ): Promise<GetBuildingsQueryResponse> {
    const { take, skip } = query.option;
    const { total, data } = await this.getAllBuildings(query.option);

    return {
      skip: +skip,
      take: +take,
      total,
      data,
    };
  }

  private async getAllBuildings(
    option: GetLocationsRequestQuery,
  ): Promise<{ data: GetLocationsResponse[]; total: number }> {
    const { search, order, valueOrder, take, skip } = option;

    const andWhereConditions: Prisma.Enumerable<Prisma.LocationWhereInput> = [
      {
        isDelete: false,
      },
    ];
    if (search) {
      andWhereConditions.push({
        OR: [
          {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      });
    }

    let orderBy: Prisma.BuildingOrderByWithRelationInput;
    if (valueOrder && order) {
      orderBy = {
        [order]: valueOrder,
      };
    }

    const [total, data] = await Promise.all([
      this.dbContext.location.count({
        where: {
          AND: andWhereConditions,
        },
      }),
      this.dbContext.location.findMany({
        where: {
          AND: andWhereConditions,
        },
        take: +take,
        skip: +skip,
        include: {
          building: true,
          childrens: true,
          parent: true,
        },
        orderBy: orderBy,
      }),
    ]);

    return { data, total };
  }
}
