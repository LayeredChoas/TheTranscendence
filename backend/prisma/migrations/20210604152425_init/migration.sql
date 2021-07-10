/*
  Warnings:

  - You are about to drop the `War` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guilds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Friendship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tournament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Guilds" DROP CONSTRAINT "Guilds_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_userId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_guild_id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_friendsId_fkey";

-- DropTable
DROP TABLE "War";

-- DropTable
DROP TABLE "Guilds";

-- DropTable
DROP TABLE "Channel";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "Friendship";

-- DropTable
DROP TABLE "Tournament";
