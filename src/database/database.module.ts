import { Module } from '@nestjs/common';
import * as services from './services';

const Services = Object.values(services);

@Module({
  imports: [],
  providers: [...Services],
  exports: [...Services],
})
export class DatabaseModule {}
