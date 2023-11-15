-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Time" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hour" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "organization_id" TEXT,
    "modality_id" TEXT,
    "user_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Time_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Time_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Time_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Time" ("created_at", "day", "hour", "id", "modality_id", "organization_id", "updated_at", "user_id") SELECT "created_at", "day", "hour", "id", "modality_id", "organization_id", "updated_at", "user_id" FROM "Time";
DROP TABLE "Time";
ALTER TABLE "new_Time" RENAME TO "Time";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
