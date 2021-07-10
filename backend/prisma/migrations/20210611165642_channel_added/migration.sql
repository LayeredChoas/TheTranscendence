-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "passwrod" TEXT,
    "users" INTEGER[],
    "admin" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
