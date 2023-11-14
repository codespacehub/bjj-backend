/*
  Warnings:

  - Added the required column `value` to the `plans` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "organization_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "plans_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_plans" ("created_at", "description", "id", "name", "organization_id", "updated_at") SELECT "created_at", "description", "id", "name", "organization_id", "updated_at" FROM "plans";
DROP TABLE "plans";
ALTER TABLE "new_plans" RENAME TO "plans";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
