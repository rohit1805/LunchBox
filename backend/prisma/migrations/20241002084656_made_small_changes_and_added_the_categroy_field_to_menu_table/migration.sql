/*
  Warnings:

  - You are about to drop the column `menuId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Cart_menuId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "menuId";

-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "category" TEXT;
