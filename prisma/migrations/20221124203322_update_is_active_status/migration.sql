-- AlterTable
ALTER TABLE "TrainerUser" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "UseronClassSchedule" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
