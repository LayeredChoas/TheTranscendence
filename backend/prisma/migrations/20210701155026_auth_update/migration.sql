/*
  Warnings:

  - You are about to drop the column `factory_method` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `guild` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - The `factory_auth` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "factory_method",
DROP COLUMN "guild",
DROP COLUMN "phone",
ADD COLUMN     "factory_email" TEXT,
DROP COLUMN "factory_auth",
ADD COLUMN     "factory_auth" BOOLEAN NOT NULL DEFAULT false;
