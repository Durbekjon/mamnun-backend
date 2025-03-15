import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateEventInfoDto } from './dto/create-event-info.dto';
import { UpdateEventInfoDto } from './dto/update-event-info.dto';

@Injectable()
export class EventInfoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateEventInfoDto) {
    const count = await this.prismaService.eventInfo.count();
    if (count >= 1) throw new ConflictException();
    return this.prismaService.eventInfo.create({ data });
  }

  findOne() {
    return this.prismaService.eventInfo.findFirst();
  }

  async changeVisibility() {
    const eventInfo = await this.findOne();
    return this.prismaService.eventInfo.update({
      where: { id: eventInfo.id },
      data: { visible: !eventInfo.visible },
    });
  }

  async update(data: UpdateEventInfoDto) {
    if (data.eventDate) data.eventDate = new Date(data.eventDate);
    const eventInfo = await this.findOne();
    if (eventInfo) {
      return this.prismaService.eventInfo.update({
        where: { id: eventInfo.id },
        data,
      });
    }
  }
}
