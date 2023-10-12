-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "organization" TEXT,
    "modality" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Teacher_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Teacher_modality_fkey" FOREIGN KEY ("modality") REFERENCES "Modality" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("birthDate", "cep", "city", "complement", "cpf", "created_at", "district", "email", "id", "modality", "name", "number", "organization", "phone", "state", "street", "updated_at") SELECT "birthDate", "cep", "city", "complement", "cpf", "created_at", "district", "email", "id", "modality", "name", "number", "organization", "phone", "state", "street", "updated_at" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
CREATE UNIQUE INDEX "Teacher_cpf_key" ON "Teacher"("cpf");
CREATE TABLE "new_Modality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organization" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Modality_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Modality" ("created_at", "description", "id", "name", "organization", "updated_at") SELECT "created_at", "description", "id", "name", "organization", "updated_at" FROM "Modality";
DROP TABLE "Modality";
ALTER TABLE "new_Modality" RENAME TO "Modality";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
