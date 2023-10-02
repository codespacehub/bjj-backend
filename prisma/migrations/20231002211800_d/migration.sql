/*
  Warnings:

  - You are about to drop the column `active` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `active` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Organization" ("cnpj", "created_at", "domain", "email", "id", "name", "phone", "updated_at") SELECT "cnpj", "created_at", "domain", "email", "id", "name", "phone", "updated_at" FROM "Organization";
DROP TABLE "Organization";
ALTER TABLE "new_Organization" RENAME TO "Organization";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "total_class" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "graduation" TEXT NOT NULL,
    "color_graduation" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "plano" TEXT NOT NULL,
    "payday" TEXT NOT NULL,
    "organization" TEXT,
    "modality" TEXT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_modality_fkey" FOREIGN KEY ("modality") REFERENCES "Modality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("birthDate", "cep", "city", "color_graduation", "cpf", "created_at", "district", "email", "graduation", "id", "modality", "name", "number", "organization", "password", "payday", "phone", "plano", "role", "state", "street", "total_class", "updated_at") SELECT "birthDate", "cep", "city", "color_graduation", "cpf", "created_at", "district", "email", "graduation", "id", "modality", "name", "number", "organization", "password", "payday", "phone", "plano", "role", "state", "street", "total_class", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
