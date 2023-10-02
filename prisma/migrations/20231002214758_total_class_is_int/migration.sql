/*
  Warnings:

  - You are about to alter the column `total_class` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "total_class" INTEGER NOT NULL,
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
INSERT INTO "new_User" ("active", "birthDate", "cep", "city", "color_graduation", "cpf", "created_at", "district", "email", "graduation", "id", "modality", "name", "number", "organization", "password", "payday", "phone", "plano", "role", "state", "street", "total_class", "updated_at", "verified") SELECT "active", "birthDate", "cep", "city", "color_graduation", "cpf", "created_at", "district", "email", "graduation", "id", "modality", "name", "number", "organization", "password", "payday", "phone", "plano", "role", "state", "street", "total_class", "updated_at", "verified" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
