import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { IContactForm } from './dto/IContact-form';
import { SubjectType } from '@prisma/client';

@Injectable()
export class ContactFormRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateContactFormDto): Promise<IContactForm> {
    return this.prismaService.contact.create({
      data: body,
    });
  }

  async findAll(): Promise<IContactForm[]> {
    return this.prismaService.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCount(type: SubjectType): Promise<number> {
    return this.prismaService.contact.count({ where: { subject: type } });
  }

  async findOne(id: number): Promise<IContactForm | null> {
    return this.prismaService.contact.findUnique({
      where: { id },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.contact.delete({
      where: { id },
    });
  }

  async getUserById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
