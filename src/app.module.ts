import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { UtilsModule } from './common/utils/utils.module';
import { ConfigModule } from '@nestjs/config';
import { InformationModule } from './modules/information/information.module';
import { MailModule } from './common/mail/mail.module';
import { ContactFormModule } from './modules/contact-form/contact-form.module';
import { ServicesModule } from './modules/services/services.module';
import { VisitModule } from './modules/visit/visit.module';
import { QuoteRequestModule } from './modules/quote-request/quote-request.module';
import { EventInfoModule } from './modules/event-info/event-info.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UtilsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InformationModule,
    MailModule,
    ContactFormModule,
    ServicesModule,
    VisitModule,
    QuoteRequestModule,
    EventInfoModule,
  ],
})
export class AppModule {}
