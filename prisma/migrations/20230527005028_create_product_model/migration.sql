-- CreateTable
CREATE TABLE "Marketplace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "marketplace_id" TEXT NOT NULL,
    CONSTRAINT "Product_marketplace_id_fkey" FOREIGN KEY ("marketplace_id") REFERENCES "Marketplace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
