/*
  Warnings:

  - Added the required column `ver` to the `ProfileData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfileData" ADD COLUMN     "ver" INTEGER NOT NULL;
