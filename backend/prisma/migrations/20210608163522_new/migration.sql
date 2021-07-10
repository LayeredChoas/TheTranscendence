/*
  Warnings:

  - You are about to drop the column `display_name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[intra_username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intra_username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.display_name_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "display_name",
ADD COLUMN     "intra_username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.intra_username_unique" ON "User"("intra_username");
