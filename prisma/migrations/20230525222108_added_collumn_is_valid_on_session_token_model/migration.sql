-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SessionToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "SessionToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SessionToken" ("id", "token", "user_id") SELECT "id", "token", "user_id" FROM "SessionToken";
DROP TABLE "SessionToken";
ALTER TABLE "new_SessionToken" RENAME TO "SessionToken";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
