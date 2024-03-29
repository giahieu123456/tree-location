import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetLocationsRequestQuery } from '../getLocations/getLocations.request-query';
import { GetBuildingsQuery } from './getLocationById.query';
import { GetLocationByIdRequestParam } from './getLocationById.request-param';
import { GetLocationsResponse } from './getlocation.response';

@ApiTags('Location')
@ApiBearerAuth()
@Controller({
  path: 'location',
  version: '1',
})
export class GetLocationByIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'get location by id' })
  @Get(':id')
  @ApiOkResponse({
    type: GetLocationsRequestQuery,
    description: 'Successfully retrieved location.',
  })
  get(
    @Param() { id }: GetLocationByIdRequestParam,
  ): Promise<GetLocationsResponse> {
    return this.queryBus.execute<GetBuildingsQuery, GetLocationsResponse>(
      new GetBuildingsQuery(id),
    );
  }
}
