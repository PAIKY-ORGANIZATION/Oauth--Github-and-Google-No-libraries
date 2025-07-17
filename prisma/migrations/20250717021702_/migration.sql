/*
  Warnings:

  - The `oauth_provider_id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "oauth_provider_id",
ADD COLUMN     "oauth_provider_id" INTEGER;
