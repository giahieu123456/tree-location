import { CreateBuildingRequestBody } from './createLocation.request-body';

export class CreateBuildingCommand {
  constructor(public readonly body: CreateBuildingRequestBody) {}
}
