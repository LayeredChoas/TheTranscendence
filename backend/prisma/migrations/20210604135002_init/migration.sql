/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "num_wins" INTEGER NOT NULL,
    "num_loss" INTEGER NOT NULL,
    "ladder_level" INTEGER NOT NULL,
    "num_won_tournaments" INTEGER NOT NULL,
    "avatar" INTEGER NOT NULL,
    "factory_auth" TEXT NOT NULL,
    "factory_method" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "friendsId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "blocked" INTEGER[],
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "adamin_op" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "player1" TEXT NOT NULL,
    "player2" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "guild_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "passwrod" TEXT,
    "userId" INTEGER NOT NULL,
    "users" INTEGER[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guilds" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "anagram" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "members" INTEGER[],
    "rank" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "officers" INTEGER[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "War" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "points" INTEGER NOT NULL,
    "timetable" INTEGER NOT NULL,
    "max_unanswered" INTEGER NOT NULL,
    "default_win" INTEGER NOT NULL,
    "guild_1_Id" INTEGER NOT NULL,
    "guild_2_Id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.display_name_unique" ON "User"("display_name");

-- CreateIndex
CREATE UNIQUE INDEX "Guilds.name_unique" ON "Guilds"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Guilds.anagram_unique" ON "Guilds"("anagram");

-- AddForeignKey
ALTER TABLE "Channel" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("friendsId") REFERENCES "Friendship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("guild_id") REFERENCES "Guilds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guilds" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
