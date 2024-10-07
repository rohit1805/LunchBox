/*
  Warnings:

  - You are about to drop the column `size` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "size";

-- AlterTable
ALTER TABLE "menu" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
