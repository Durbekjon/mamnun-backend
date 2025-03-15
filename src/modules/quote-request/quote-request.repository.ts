import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QuoteRequest, QuoteType } from '@prisma/client';
import { CreateQuoteRequestDto } from './dto/create-quote-request.dto';
import { MailService } from '../../common/mail/mail.service';
import { SendContactFormMessageDto } from 'src/common/mail/dto/send-contact-form-message.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuoteRequestRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async create(body: CreateQuoteRequestDto): Promise<QuoteRequest> {
    // const data: SendContactFormMessageDto = {
    //   firstName: body.name,
    //   from: body.email,
    //   to: await this.configService.get(body.quoteType + '_MAIL'),
    //   subject: body.requestType,
    //   message: body.message,
    //   createdAt: new Date(),
    // };
    // await this.mailService.sendContactFormMessage(data);
    const data = {
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      message: body.message,
      quoteType: body.quoteType,
      service: { connect: { id: body.serviceId } },
    };
    return this.prismaService.quoteRequest.create({
      data,
    });
  }

  async findAll() {
    const [edu, travel, quoteRequests] = await Promise.all([
      this.countQuoteType(QuoteType.EDU),
      this.countQuoteType(QuoteType.TRAVEL),
      this.prismaService.quoteRequest.findMany({ include: { service: true } }),
    ]);

    return {
      edu,
      travel,
      quoteRequests,
    };
  }

  async countQuoteType(quoteType: QuoteType): Promise<number> {
    return this.prismaService.quoteRequest.count({
      where: { quoteType: quoteType },
    });
  }

  async findOne(id: number): Promise<QuoteRequest> {
    return this.prismaService.quoteRequest.findUnique({
      where: { id },
    });
  }

  async delete(id: number): Promise<QuoteRequest> {
    return this.prismaService.quoteRequest.delete({ where: { id } });
  }
}
