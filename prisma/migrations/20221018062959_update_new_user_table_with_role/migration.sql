/*
  Warnings:

  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trainers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ADMIN', 'TRAINER');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "trainers" DROP CONSTRAINT "trainers_userId_fkey";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "trainers";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthday" TIMESTAMP(3),
    "passport" TEXT,
    "gender" "GENDER",
    "bloodType" TEXT,
    "country" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "phoneNumber" TEXT,
    "professional" TEXT,
    "specialSkills" TEXT,
    "certificate" TEXT,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
