/*
  Warnings:

  - Added the required column `mealType` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_menuId_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "mealType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
