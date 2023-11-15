/*
  Warnings:

  - You are about to alter the column `amount_class` on the `graduations` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_graduations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color_degree" TEXT,
    "amount_class" INTEGER,
    "modality_id" TEXT,
    "organization_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "graduations_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "graduations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_graduations" ("amount_class", "color_degree", "created_at", "id", "modality_id", "name", "organization_id", "updated_at") SELECT "amount_class", "color_degree", "created_at", "id", "modality_id", "name", "organization_id", "updated_at" FROM "graduations";
DROP TABLE "graduations";
ALTER TABLE "new_graduations" RENAME TO "graduations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
