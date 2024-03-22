import { GetLocationsRequestQuery } from './getLocations.request-query';

export class GetBuildingsQuery {
  constructor(public readonly option: GetLocationsRequestQuery) {}
}
