import { Module } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';
import { ContactFormRepository } from './contact-form.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MailService } from 'src/common/mail/mail.service';

@Module({
  controllers: [ContactFormController],
  providers: [
    ContactFormService,
    ContactFormRepository,
    PrismaService,
    MailService,
  ],
})
export class ContactFormModule {}
