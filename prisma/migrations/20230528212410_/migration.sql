/*
  Warnings:

  - A unique constraint covering the columns `[product_id,shopping_list_id]` on the table `ProductsOnShoppingList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductsOnShoppingList_shopping_list_id_product_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProductsOnShoppingList_product_id_shopping_list_id_key" ON "ProductsOnShoppingList"("product_id", "shopping_list_id");
