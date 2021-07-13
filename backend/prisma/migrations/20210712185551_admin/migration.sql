/*
  Warnings:

  - You are about to drop the column `adamin_op` on the `User` table. All the data in the column will be lost.
  - Added the required column `admin_op` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `rating` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "adamin_op",
ADD COLUMN     "admin_op" INTEGER NOT NULL,
DROP COLUMN "rating",
ADD COLUMN     "rating" BOOLEAN NOT NULL;
