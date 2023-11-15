/*
  Warnings:

  - You are about to drop the `Times` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Times";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Time" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hour" TEXT NOT NULL,
    "day" DATETIME NOT NULL,
    "organization_id" TEXT,
    "modality_id" TEXT,
    "user_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Time_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Time_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Time_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
