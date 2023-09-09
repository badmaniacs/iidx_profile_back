/*
  Warnings:

  - Changed the type of `musicData` on the `ProfileData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProfileData" DROP COLUMN "musicData",
ADD COLUMN     "musicData" JSONB NOT NULL;
