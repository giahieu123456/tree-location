import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetBuildingsQuery } from './getLocations.query';
import { GetLocationsRequestQuery } from './getLocations.request-query';
import { GetBuildingsQueryResponse } from './getLocations.response';

@ApiTags('Location')
@ApiBearerAuth()
@Controller({
  path: 'location',
  version: '1',
})
export class GetLegalDocEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'get locations' })
  @Get()
  @ApiOkResponse({
    type: GetBuildingsQueryResponse,
    description: 'Successfully retrieved location.',
  })
  get(
    @Query() query: GetLocationsRequestQuery,
  ): Promise<GetBuildingsQueryResponse> {
    return this.queryBus.execute<GetBuildingsQuery, GetBuildingsQueryResponse>(
      new GetBuildingsQuery(query),
    );
  }
}
