/*
  Warnings:

  - You are about to drop the column `location` on the `ServicePublic` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ServicePublic_location_idx";

-- AlterTable
ALTER TABLE "ServicePublic" DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
