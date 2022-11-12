-- CreateEnum
CREATE TYPE "CLASSTYPE" AS ENUM ('CARDIO', 'STRENGTH', 'FLEXLITY');

-- CreateTable
CREATE TABLE "ClassSchedule" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "classType" "CLASSTYPE" NOT NULL,
    "teacher" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "entries" INTEGER NOT NULL DEFAULT 0,
    "limit" INTEGER NOT NULL,

    CONSTRAINT "ClassSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UseronClassSchedule" (
    "userId" INTEGER NOT NULL,
    "classScheduleId" INTEGER NOT NULL,

    CONSTRAINT "UseronClassSchedule_pkey" PRIMARY KEY ("userId","classScheduleId")
);

-- AddForeignKey
ALTER TABLE "UseronClassSchedule" ADD CONSTRAINT "UseronClassSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UseronClassSchedule" ADD CONSTRAINT "UseronClassSchedule_classScheduleId_fkey" FOREIGN KEY ("classScheduleId") REFERENCES "ClassSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
