/*
  Warnings:

  - You are about to drop the column `dpArena` on the `ProfileData` table. All the data in the column will be lost.
  - You are about to drop the column `dpClass` on the `ProfileData` table. All the data in the column will be lost.
  - You are about to drop the column `dpMusicData` on the `ProfileData` table. All the data in the column will be lost.
  - You are about to drop the column `dpRadarData` on the `ProfileData` table. All the data in the column will be lost.
  - You are about to drop the column `spArena` on the `ProfileData` table. All the data in the column will be lost.
  - You are about to drop the column `spClass` on the `ProfileData` table. All the data in the column will be lost.
  - You are about to drop the column `spMusicData` on the `ProfileData` table. All the data in the column will be lost.
  - You are about to drop the column `spRadarData` on the `ProfileData` table. All the data in the column will be lost.
  - Added the required column `arena` to the `ProfileData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `ProfileData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radar` to the `ProfileData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfileData" DROP COLUMN "dpArena",
DROP COLUMN "dpClass",
DROP COLUMN "dpMusicData",
DROP COLUMN "dpRadarData",
DROP COLUMN "spArena",
DROP COLUMN "spClass",
DROP COLUMN "spMusicData",
DROP COLUMN "spRadarData",
ADD COLUMN     "arena" JSONB NOT NULL,
ADD COLUMN     "class" JSONB NOT NULL,
ADD COLUMN     "musicData" JSONB[],
ADD COLUMN     "radar" JSONB NOT NULL;
