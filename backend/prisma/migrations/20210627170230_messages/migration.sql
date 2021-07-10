-- AlterTable
ALTER TABLE "User" ADD COLUMN     "messages" INTEGER[];

-- CreateTable
CREATE TABLE "messsage" (
    "id" SERIAL NOT NULL,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "type" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
