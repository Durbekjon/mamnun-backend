/*
  Warnings:

  - You are about to drop the column `request_for` on the `quote_requests` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `quote_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quote_requests" DROP COLUMN "request_for",
ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "RequestType";

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
