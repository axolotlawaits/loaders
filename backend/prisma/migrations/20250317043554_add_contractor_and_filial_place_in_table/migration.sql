/*
  Warnings:

  - Added the required column `place` to the `Filial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractor` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filial" ADD COLUMN     "place" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "contractor" TEXT NOT NULL;
