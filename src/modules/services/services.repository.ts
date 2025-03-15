import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Prisma, ServiceType, User } from '@prisma/client';
import { ServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createService(body: CreateServiceDto): Promise<ServiceDto> {
    return this.prismaService.service.create({
      data: body,
    });
  }

  async getAllServices(type?: ServiceType): Promise<ServiceDto[]> {
    const where: Prisma.ServiceWhereInput = {};

    if (type) where.type = type;

    return this.prismaService.service.findMany({ where });
  }

  async getServiceById(id: number): Promise<ServiceDto> {
    return this.prismaService.service.findUnique({
      where: { id },
    });
  }

  async updateService(id: number, body: UpdateServiceDto): Promise<ServiceDto> {
    return this.prismaService.service.update({
      where: { id },
      data: body,
    });
  }

  async deleteService(id: number): Promise<void> {
    await this.prismaService.service.delete({
      where: { id },
    });
  }
  async getUserById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
