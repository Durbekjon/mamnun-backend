import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { InformationDto } from './dto/information.dto';

@Injectable()
export class InformationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // CREATE
  async create(data: CreateInformationDto): Promise<InformationDto> {
    return this.prismaService.information.create({ data });
  }

  // READ FIRST
  async findOne(): Promise<InformationDto | null> {
    return this.prismaService.information.findFirst();
  }

  // UPDATE
  async update(
    id: number,
    data: Partial<CreateInformationDto>,
  ): Promise<InformationDto> {
    return this.prismaService.information.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async delete(id: number): Promise<void> {
    await this.prismaService.information.delete({ where: { id } });
  }

  async getUserById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
