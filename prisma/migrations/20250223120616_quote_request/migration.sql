/*
  Warnings:

  - Changed the type of `request_for` on the `quote_requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "quote_requests" DROP COLUMN "request_for",
ADD COLUMN     "request_for" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RequestType";
