-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "hash" TEXT,
    "oauth_provider" TEXT,
    "oauth_provider_id" TEXT,
    "email" TEXT,
    "oauth_encrypted_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
