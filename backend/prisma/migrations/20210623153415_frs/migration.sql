/*
  Warnings:

  - You are about to drop the column `user1Id` on the `Friendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1,user2]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_user1Id_fkey";

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "user1Id",
ADD COLUMN     "user1" INTEGER NOT NULL,
ADD COLUMN     "user2" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friends" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Friendship.user1_user2_unique" ON "Friendship"("user1", "user2");
