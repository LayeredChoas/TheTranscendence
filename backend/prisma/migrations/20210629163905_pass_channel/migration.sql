/*
  Warnings:

  - You are about to drop the column `passwrod` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "passwrod",
ADD COLUMN     "password" TEXT;
