/*
  Warnings:

  - Added the required column `description` to the `Modality` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Modality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Modality_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Modality" ("created_at", "id", "name", "organization", "updated_at") SELECT "created_at", "id", "name", "organization", "updated_at" FROM "Modality";
DROP TABLE "Modality";
ALTER TABLE "new_Modality" RENAME TO "Modality";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
