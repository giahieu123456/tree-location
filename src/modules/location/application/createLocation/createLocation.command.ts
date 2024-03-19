import { CreateLocationRequestBody } from './createLocation.request-body';

export class CreateLocationCommand {
  constructor(public readonly body: CreateLocationRequestBody) {}
}
