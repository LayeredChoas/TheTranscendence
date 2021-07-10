-- AlterTable
ALTER TABLE "User" ADD COLUMN     "matches" INTEGER[];

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "player1" TEXT NOT NULL,
    "player2" TEXT NOT NULL,
    "winner" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "reward" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
