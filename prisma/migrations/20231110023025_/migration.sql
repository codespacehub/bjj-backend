/*
  Warnings:

  - You are about to drop the column `organizationId` on the `graduations` table. All the data in the column will be lost.
  - You are about to drop the column `modalityId` on the `Times` table. All the data in the column will be lost.
  - You are about to drop the column `graduation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `modality` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `organization` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `organization` on the `modalities` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_graduations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color_degree" TEXT,
    "modality_id" TEXT,
    "organization_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "graduations_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "graduations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_graduations" ("color_degree", "created_at", "id", "modality_id", "name", "updated_at") SELECT "color_degree", "created_at", "id", "modality_id", "name", "updated_at" FROM "graduations";
DROP TABLE "graduations";
ALTER TABLE "new_graduations" RENAME TO "graduations";
CREATE TABLE "new_Times" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modality_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Times_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Times" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "Times";
DROP TABLE "Times";
ALTER TABLE "new_Times" RENAME TO "Times";
CREATE TABLE "new_users" (
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
    "graduation_id" TEXT,
    "organization_id" TEXT,
    "modality_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_graduation_id_fkey" FOREIGN KEY ("graduation_id") REFERENCES "graduations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("active", "amount_class", "birth_date", "cep", "city", "cpf", "created_at", "degree", "district", "email", "house_number", "id", "name", "password", "payday", "phone", "plan", "role", "street", "uf", "updated_at", "verified") SELECT "active", "amount_class", "birth_date", "cep", "city", "cpf", "created_at", "degree", "district", "email", "house_number", "id", "name", "password", "payday", "phone", "plan", "role", "street", "uf", "updated_at", "verified" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_modalities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organization_id" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "modalities_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_modalities" ("created_at", "description", "id", "name", "updated_at") SELECT "created_at", "description", "id", "name", "updated_at" FROM "modalities";
DROP TABLE "modalities";
ALTER TABLE "new_modalities" RENAME TO "modalities";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
