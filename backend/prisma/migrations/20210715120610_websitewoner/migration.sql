-- AlterTable
ALTER TABLE "User" ADD COLUMN     "owner" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "admin_op" SET DEFAULT false;
