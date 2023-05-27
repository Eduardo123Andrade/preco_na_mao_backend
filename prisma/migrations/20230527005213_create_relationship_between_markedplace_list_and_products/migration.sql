-- CreateTable
CREATE TABLE "ProductsOnMarketplaceList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "marketplace_list_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "ProductsOnMarketplaceList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductsOnMarketplaceList_marketplace_list_id_fkey" FOREIGN KEY ("marketplace_list_id") REFERENCES "MarketplaceList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
