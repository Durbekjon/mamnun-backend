import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { SendContactFormMessageDto } from './dto/send-contact-form-message.dto';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}
  private transporter = createTransport({
    host: this.configService.get<string>('EMAIL_HOST'),
    port: 465,
    secure: true,
    auth: {
      user: this.configService.get<string>('EMAIL_USER'),
      pass: this.configService.get<string>('EMAIL_PASSWORD'),
    },
  });

  sendContactFormMessage(sendContactFormMessageDto: SendContactFormMessageDto) {
    const { from, to, subject, message, createdAt, firstName, lastName } =
      sendContactFormMessageDto;
    const html = `<body>
    <ul>
      <li>name: ${firstName}</li>
      <li>last name: ${lastName}</li>
      <li>email: ${from}</li>
      <li>subject: ${subject}</li>
      <li>message: ${message}</li>
      <li>sent at: ${createdAt}</li>
    </ul>
  </body>`;
    return this.transporter.sendMail({
      from,
      to,
      subject: `${subject}: ${from}`,
      html,
    });
  }
}
