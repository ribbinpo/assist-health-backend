-- CreateTable
CREATE TABLE "TrainerUser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,

    CONSTRAINT "TrainerUser_pkey" PRIMARY KEY ("id")
);
