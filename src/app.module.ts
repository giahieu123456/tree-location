import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { BuildingModule } from './modules/building/building.module';
import { LocationModule } from './modules/location';

@Module({
  imports: [DatabaseModule, LocationModule, BuildingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
