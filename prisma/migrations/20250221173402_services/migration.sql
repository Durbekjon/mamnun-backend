-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('edu', 'travel');

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ServiceType" NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);
