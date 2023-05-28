/*
  Warnings:

  - A unique constraint covering the columns `[shopping_list_id,product_id]` on the table `ProductsOnShoppingList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductsOnShoppingList_shopping_list_id_product_id_key" ON "ProductsOnShoppingList"("shopping_list_id", "product_id");
