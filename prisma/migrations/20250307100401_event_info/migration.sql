/*
  Warnings:

  - Changed the type of `request_for` on the `quote_requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('INTERNSHIPS', 'TEACHER_TRAININGS', 'SHORT_TERM_PROGRAMS', 'DEGREE_PROGRAMS', 'TOUR_PACKAGE', 'FULL_VIP_ASSISTANCE', 'MEET_AND_GREET_FAST_TRACK', 'GROUND_TRANSPORTATION');

-- AlterTable
ALTER TABLE "quote_requests" DROP COLUMN "request_for",
ADD COLUMN     "request_for" "RequestType" NOT NULL;

-- CreateTable
CREATE TABLE "EventInfo" (
    "event_id" SERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "event_time" TEXT NOT NULL,
    "event_location" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "student_benefits" JSONB NOT NULL,
    "institution_benefits" JSONB NOT NULL,
    "registration_deadline" TIMESTAMP(3) NOT NULL,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EventInfo_pkey" PRIMARY KEY ("event_id")
);
