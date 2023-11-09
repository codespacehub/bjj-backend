/*
  Warnings:

  - Made the column `degree` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "amount_class" INTEGER NOT NULL,
    "degree" INTEGER NOT NULL,
    "plan" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "payday" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "graduation" TEXT,
    "organization" TEXT,
    "modality" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_graduation_fkey" FOREIGN KEY ("graduation") REFERENCES "Graduation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_modality_fkey" FOREIGN KEY ("modality") REFERENCES "Modality" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "amount_class", "birth_date", "cep", "city", "cpf", "created_at", "degree", "district", "email", "graduation", "house_number", "id", "modality", "name", "organization", "password", "payday", "phone", "plan", "role", "street", "uf", "updated_at", "verified") SELECT "active", "amount_class", "birth_date", "cep", "city", "cpf", "created_at", "degree", "district", "email", "graduation", "house_number", "id", "modality", "name", "organization", "password", "payday", "phone", "plan", "role", "street", "uf", "updated_at", "verified" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
