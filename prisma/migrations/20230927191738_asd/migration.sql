/*
  Warnings:

  - You are about to drop the `Modalitie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `modalitie` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `modalitie` on the `User` table. All the data in the column will be lost.
  - Added the required column `modality` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modality` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Modalitie";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Modality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization" TEXT NOT NULL,
    CONSTRAINT "Modality_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization" TEXT,
    "modality" TEXT NOT NULL,
    CONSTRAINT "Teacher_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Teacher_modality_fkey" FOREIGN KEY ("modality") REFERENCES "Modality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("birthDate", "cep", "city", "complement", "cpf", "created_at", "district", "email", "id", "name", "number", "organization", "phone", "state", "street", "updated_at") SELECT "birthDate", "cep", "city", "complement", "cpf", "created_at", "district", "email", "id", "name", "number", "organization", "phone", "state", "street", "updated_at" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
CREATE UNIQUE INDEX "Teacher_cpf_key" ON "Teacher"("cpf");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "total_class" TEXT NOT NULL,
    "graduation" TEXT NOT NULL,
    "color_graduation" TEXT NOT NULL,
    "plano" TEXT NOT NULL,
    "payday" TEXT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization" TEXT,
    "modality" TEXT NOT NULL,
    CONSTRAINT "User_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_modality_fkey" FOREIGN KEY ("modality") REFERENCES "Modality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("birthDate", "cep", "city", "color_graduation", "complement", "cpf", "created_at", "district", "email", "graduation", "id", "name", "number", "organization", "payday", "phone", "plano", "state", "street", "total_class", "updated_at") SELECT "birthDate", "cep", "city", "color_graduation", "complement", "cpf", "created_at", "district", "email", "graduation", "id", "name", "number", "organization", "payday", "phone", "plano", "state", "street", "total_class", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
