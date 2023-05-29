-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SessionToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "SessionToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SessionToken" ("id", "isValid", "token", "user_id") SELECT "id", "isValid", "token", "user_id" FROM "SessionToken";
DROP TABLE "SessionToken";
ALTER TABLE "new_SessionToken" RENAME TO "SessionToken";
CREATE TABLE "new_ShoppingList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ShoppingList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ShoppingList" ("date", "id", "name", "user_id") SELECT "date", "id", "name", "user_id" FROM "ShoppingList";
DROP TABLE "ShoppingList";
ALTER TABLE "new_ShoppingList" RENAME TO "ShoppingList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
