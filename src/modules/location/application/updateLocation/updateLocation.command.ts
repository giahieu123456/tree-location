import { UpdateLocationRequestBody } from './updateLocation.request-body';

export class UpdateLocationCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateLocationRequestBody,
  ) {}
}
