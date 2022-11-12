-- DropForeignKey
ALTER TABLE "ClassSchedule" DROP CONSTRAINT "ClassSchedule_room_id_fkey";

-- AlterTable
ALTER TABLE "ClassSchedule" ALTER COLUMN "room_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassSchedule" ADD CONSTRAINT "ClassSchedule_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
