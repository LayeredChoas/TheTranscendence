/*
  Warnings:

  - Added the required column `arena` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `player1` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `player2` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "arena" TEXT NOT NULL,
ADD COLUMN     "title" TEXT,
DROP COLUMN "player1",
ADD COLUMN     "player1" INTEGER NOT NULL,
DROP COLUMN "player2",
ADD COLUMN     "player2" INTEGER NOT NULL;
