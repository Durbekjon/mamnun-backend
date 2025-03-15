import { ForbiddenException, Injectable } from '@nestjs/common';
import { ContactFormRepository } from './contact-form.repository';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/common/mail/mail.service';
import { SendContactFormMessageDto } from 'src/common/mail/dto/send-contact-form-message.dto';
import { IUser } from '../auth/dto/user.interface';
import { APP_MESSAGES } from 'src/common/app-messages';
import { IContactForm } from './dto/IContact-form';
import { SubjectType } from '@prisma/client';
import { FindAllContactFormsResponseDto } from './dto/find-all.response.dto';

@Injectable()
export class ContactFormService {
  constructor(
    private readonly contactFormRepository: ContactFormRepository,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async create(body: CreateContactFormDto): Promise<{ result: string }> {
    const contactForm = await this.contactFormRepository.create(body);
    const { subject } = body;
    if ((subject && subject == 'edu') || subject == 'travel') {
      const adminEmail = this.configService.get<string>(
        `${subject.toUpperCase()}_EMAIL`,
      );
      const data: SendContactFormMessageDto = {
        from: body.email,
        to: adminEmail,
        subject,
        ...body,
        createdAt: contactForm.createdAt,
      };
      await this.mailService.sendContactFormMessage(data);
    }

    return { result: 'OK' };
  }

  async findAll(user: IUser): Promise<FindAllContactFormsResponseDto> {
    await this.validateUser(user);

    const [contactForms, business, edu, travel, other] = await Promise.all([
      this.contactFormRepository.findAll(),
      this.contactFormRepository.getCount(SubjectType.business),
      this.contactFormRepository.getCount(SubjectType.edu),
      this.contactFormRepository.getCount(SubjectType.travel),
      this.contactFormRepository.getCount(SubjectType.other),
    ]);

    return { contactForms, business, edu, travel, other };
  }

  async findOne(id: number, user: IUser): Promise<IContactForm | null> {
    await this.validateUser(user);

    return this.contactFormRepository.findOne(id);
  }

  async remove(id: number, user: IUser): Promise<{ result: string }> {
    await this.validateUser(user);

    await this.contactFormRepository.delete(id);

    return { result: 'OK' };
  }

  private async validateUser(user: IUser): Promise<boolean> {
    const isExistUser = await this.contactFormRepository.getUserById(user.id);
    if (!isExistUser) {
      throw new ForbiddenException(APP_MESSAGES.USER_NOT_AUTHORIZED);
    }

    return true;
  }
}
