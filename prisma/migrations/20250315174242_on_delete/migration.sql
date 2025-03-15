-- DropForeignKey
ALTER TABLE "quote_requests" DROP CONSTRAINT "quote_requests_serviceId_fkey";

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
