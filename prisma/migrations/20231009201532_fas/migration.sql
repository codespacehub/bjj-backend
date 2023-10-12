/*
  Warnings:

  - You are about to drop the column `modality` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "total_class" INTEGER NOT NULL,
    "graduation" TEXT NOT NULL,
    "color_graduation" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "plan" TEXT NOT NULL,
    "payday" INTEGER NOT NULL,
    "organization" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "birth_date", "color_graduation", "cpf", "created_at", "email", "graduation", "id", "name", "organization", "password", "payday", "phone", "plan", "role", "total_class", "updated_at", "verified") SELECT "active", "birth_date", "color_graduation", "cpf", "created_at", "email", "graduation", "id", "name", "organization", "password", "payday", "phone", "plan", "role", "total_class", "updated_at", "verified" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
