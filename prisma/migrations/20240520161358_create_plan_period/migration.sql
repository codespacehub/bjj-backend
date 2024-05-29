/*
  Warnings:

  - You are about to drop the column `limit` on the `plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "plans" DROP COLUMN "limit",
ADD COLUMN     "class_limit" INTEGER,
ADD COLUMN     "plan_period" INTEGER;
