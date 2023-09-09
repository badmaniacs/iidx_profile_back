/*
  Warnings:

  - The `musicData` column on the `ProfileData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProfileData" DROP COLUMN "musicData",
ADD COLUMN     "musicData" JSONB[];
