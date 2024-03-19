import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { LocationModule } from './modules/location';

@Module({
  imports: [DatabaseModule, LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
