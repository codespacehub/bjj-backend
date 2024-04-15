-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "payment_method_value" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "limit" INTEGER;
