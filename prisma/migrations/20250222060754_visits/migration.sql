/*
  Warnings:

  - You are about to drop the column `created_at` on the `visits` table. All the data in the column will be lost.
  - Added the required column `date` to the `visits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visits" DROP COLUMN "created_at",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visits" TIMESTAMP(3)[];
