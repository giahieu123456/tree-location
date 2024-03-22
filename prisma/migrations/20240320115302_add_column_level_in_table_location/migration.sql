/*
  Warnings:

  - Added the required column `level` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "level" INTEGER NOT NULL;
