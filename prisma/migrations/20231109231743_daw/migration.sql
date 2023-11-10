-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Graduation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color_degree" TEXT,
    "modalityId" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Graduation_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "Modality" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Graduation" ("color_degree", "created_at", "id", "name", "updated_at") SELECT "color_degree", "created_at", "id", "name", "updated_at" FROM "Graduation";
DROP TABLE "Graduation";
ALTER TABLE "new_Graduation" RENAME TO "Graduation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
