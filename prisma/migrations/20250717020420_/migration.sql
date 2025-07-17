/*
  Warnings:

  - You are about to drop the column `oauth_encrypted_token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "oauth_encrypted_token",
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "oauth_encrypted_access_token" TEXT;
