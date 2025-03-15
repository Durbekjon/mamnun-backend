-- CreateEnum
CREATE TYPE "QuoteType" AS ENUM ('EDU', 'TRAVEL');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('INTERNSHIPS', 'TEACHER_TRAININGS', 'SHORT_TERM_PROGRAMS', 'DEGREE_PROGRAMS', 'TOUR_PACKAGE', 'FULL_VIP_ASSISTANCE', 'MEET_AND_GREET_FAST_TRACK', 'GROUND_TRANSPORTATION');

-- CreateTable
CREATE TABLE "quote_requests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" VARCHAR(20),
    "message" TEXT NOT NULL,
    "type" "QuoteType" NOT NULL,
    "request_for" "RequestType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);
