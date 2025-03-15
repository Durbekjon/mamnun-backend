
export class SendContactFormMessageDto {
  firstName: string;
  lastName?: string;
  from: string;
  to: string;
  subject: string;
  message: string;
  createdAt: Date;
}
