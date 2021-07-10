/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "gameId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Match.gameId_unique" ON "Match"("gameId");
