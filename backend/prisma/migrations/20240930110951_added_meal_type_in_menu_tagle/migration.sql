/*
  Warnings:

  - Added the required column `mealType` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "mealType" TEXT NOT NULL;
