/*
  Warnings:

  - The primary key for the `ProductsOnShoppingList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductsOnShoppingList` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductsOnShoppingList" (
    "quantity" INTEGER NOT NULL,
    "shopping_list_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "ProductsOnShoppingList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductsOnShoppingList_shopping_list_id_fkey" FOREIGN KEY ("shopping_list_id") REFERENCES "ShoppingList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductsOnShoppingList" ("product_id", "quantity", "shopping_list_id") SELECT "product_id", "quantity", "shopping_list_id" FROM "ProductsOnShoppingList";
DROP TABLE "ProductsOnShoppingList";
ALTER TABLE "new_ProductsOnShoppingList" RENAME TO "ProductsOnShoppingList";
CREATE UNIQUE INDEX "ProductsOnShoppingList_product_id_shopping_list_id_key" ON "ProductsOnShoppingList"("product_id", "shopping_list_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
