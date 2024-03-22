import { QueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database';
import { GetBuildingsQuery } from './getBuildings.query';
import { GetBuildingsRequestQuery } from './getBuildings.request-query';
import {
  GetBuildingsQueryResponse,
  GetBuildingsResponse,
} from './getBuildings.response';

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
    option: GetBuildingsRequestQuery,
  ): Promise<{ data: GetBuildingsResponse[]; total: number }> {
    const { search, order, valueOrder, take, skip } = option;

    const andWhereConditions: Prisma.Enumerable<Prisma.BuildingWhereInput> = [
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
      this.dbContext.building.count({
        where: {
          AND: andWhereConditions,
        },
      }),
      this.dbContext.building.findMany({
        where: {
          AND: andWhereConditions,
        },
        take: +take,
        skip: +skip,
        include: {
          Location: {
            where: {
              isDelete: false,
            },
          },
        },
        orderBy: orderBy,
      }),
    ]);

    return { data, total };
  }
}
