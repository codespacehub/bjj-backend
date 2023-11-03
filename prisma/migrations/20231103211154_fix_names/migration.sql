/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `deggree` on the `Graduation` table. All the data in the column will be lost.
  - Added the required column `active` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "organization" TEXT,
    "modality" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Teacher_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Teacher_modality_fkey" FOREIGN KEY ("modality") REFERENCES "Modality" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("cep", "city", "cpf", "created_at", "district", "email", "house_number", "id", "modality", "name", "organization", "phone", "street", "updated_at") SELECT "cep", "city", "cpf", "created_at", "district", "email", "house_number", "id", "modality", "name", "organization", "phone", "street", "updated_at" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
CREATE UNIQUE INDEX "Teacher_cpf_key" ON "Teacher"("cpf");
CREATE TABLE "new_Graduation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "degree" INTEGER,
    "color_deggree" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Graduation" ("color_deggree", "created_at", "id", "name", "updated_at") SELECT "color_deggree", "created_at", "id", "name", "updated_at" FROM "Graduation";
DROP TABLE "Graduation";
ALTER TABLE "new_Graduation" RENAME TO "Graduation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
