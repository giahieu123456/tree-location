import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetBuildingsQuery } from './getBuildings.query';
import { GetBuildingsRequestQuery } from './getBuildings.request-query';
import { GetBuildingsQueryResponse } from './getBuildings.response';

@ApiTags('building')
@ApiBearerAuth()
@Controller({
  path: 'building',
  version: '1',
})
export class GetLegalDocEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'get buildings' })
  @Get()
  @ApiOkResponse({
    type: GetBuildingsQueryResponse,
    description: 'Successfully retrieved building.',
  })
  get(
    @Query() query: GetBuildingsRequestQuery,
  ): Promise<GetBuildingsQueryResponse> {
    return this.queryBus.execute<GetBuildingsQuery, GetBuildingsQueryResponse>(
      new GetBuildingsQuery(query),
    );
  }
}
