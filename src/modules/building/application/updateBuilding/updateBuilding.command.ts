import { UpdateBuildingRequestBody } from './updateLegalDoc.request-body';

export class UpdateBuildingCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateBuildingRequestBody,
  ) {}
}
