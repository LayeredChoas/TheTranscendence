/*
  Warnings:

  - A unique constraint covering the columns `[factory_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.factory_email_unique" ON "User"("factory_email");
