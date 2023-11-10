/*
  Warnings:

  - You are about to drop the column `modalityId` on the `Graduation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Graduation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color_degree" TEXT,
    "modality_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Graduation_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "Modality" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Graduation" ("color_degree", "created_at", "id", "name", "updated_at") SELECT "color_degree", "created_at", "id", "name", "updated_at" FROM "Graduation";
DROP TABLE "Graduation";
ALTER TABLE "new_Graduation" RENAME TO "Graduation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
