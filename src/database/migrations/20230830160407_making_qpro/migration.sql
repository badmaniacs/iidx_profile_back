/*
  Warnings:

  - Added the required column `qpro` to the `ProfileData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfileData" ADD COLUMN     "qpro" TEXT NOT NULL;
