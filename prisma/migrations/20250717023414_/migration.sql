/*
  Warnings:

  - You are about to drop the column `oauth_encrypted_access_token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "oauth_encrypted_access_token",
ADD COLUMN     "encrypted_oauth_access_token" TEXT;
