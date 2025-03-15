/*
  Warnings:

  - You are about to drop the `EventInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EventInfo";

-- CreateTable
CREATE TABLE "event_info" (
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

    CONSTRAINT "event_info_pkey" PRIMARY KEY ("event_id")
);
