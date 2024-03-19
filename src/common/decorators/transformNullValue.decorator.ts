import { Transform } from 'class-transformer';
import { ValidationOptions } from 'class-validator';

export function TransFormNullValue(validationOptions?: ValidationOptions) {
  return Transform(({ value }) => {
    return value === '' ? null : value;
  }, validationOptions);
}
