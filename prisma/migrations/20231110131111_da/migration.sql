-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "planId" TEXT,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_graduation_id_fkey" FOREIGN KEY ("graduation_id") REFERENCES "graduations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "modalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("active", "amount_class", "birth_date", "cep", "city", "cpf", "created_at", "degree", "district", "email", "graduation_id", "house_number", "id", "modality_id", "name", "organization_id", "password", "payday", "phone", "plan", "role", "street", "uf", "updated_at", "verified") SELECT "active", "amount_class", "birth_date", "cep", "city", "cpf", "created_at", "degree", "district", "email", "graduation_id", "house_number", "id", "modality_id", "name", "organization_id", "password", "payday", "phone", "plan", "role", "street", "uf", "updated_at", "verified" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
