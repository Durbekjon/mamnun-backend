import { Module } from '@nestjs/common';
import { QuoteRequestService } from './quote-request.service';
import { QuoteRequestController } from './quote-request.controller';
import { QuoteRequestRepository } from './quote-request.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MailService } from 'src/common/mail/mail.service';

@Module({
  controllers: [QuoteRequestController],
  providers: [
    QuoteRequestService,
    QuoteRequestRepository,
    PrismaService,
    MailService,
  ],
})
export class QuoteRequestModule {}
