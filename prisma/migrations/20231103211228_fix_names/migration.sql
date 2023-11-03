/*
  Warnings:

  - You are about to drop the column `color_deggree` on the `Graduation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Graduation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "degree" INTEGER,
    "color_degree" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Graduation" ("created_at", "degree", "id", "name", "updated_at") SELECT "created_at", "degree", "id", "name", "updated_at" FROM "Graduation";
DROP TABLE "Graduation";
ALTER TABLE "new_Graduation" RENAME TO "Graduation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
