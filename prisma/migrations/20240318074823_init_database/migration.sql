
-- Create extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CreateEnum
CREATE TYPE "unit" AS ENUM ('CM2', 'M2', 'KM2');

-- CreateTable
CREATE TABLE "building" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(50) NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pk_building" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(50) NOT NULL,
    "location_number" VARCHAR(255) NOT NULL,
    "area_value" DECIMAL NOT NULL,
    "unit" "unit" NOT NULL DEFAULT 'M2',
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "buildingId" UUID NOT NULL,
    "parent_id" UUID,

    CONSTRAINT "pk_location" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "building_name_key" ON "building"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_name_key" ON "location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_location_number_key" ON "location"("location_number");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "fk_location_to_building" FOREIGN KEY ("buildingId") REFERENCES "building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
