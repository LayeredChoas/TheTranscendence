/*
  Warnings:

  - Added the required column `time_zone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "time_zone" TEXT NOT NULL;
