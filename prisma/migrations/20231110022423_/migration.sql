-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_graduations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color_degree" TEXT,
    "modality_id" TEXT,
    "organizationId" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "graduations_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "graduations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_graduations" ("color_degree", "created_at", "id", "modality_id", "name", "updated_at") SELECT "color_degree", "created_at", "id", "modality_id", "name", "updated_at" FROM "graduations";
DROP TABLE "graduations";
ALTER TABLE "new_graduations" RENAME TO "graduations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
