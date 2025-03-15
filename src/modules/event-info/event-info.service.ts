import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventInfoDto } from './dto/create-event-info.dto';
import { UpdateEventInfoDto } from './dto/update-event-info.dto';
import { EventInfoRepository } from './event-info.repository';

@Injectable()
export class EventInfoService {
  constructor(private readonly eventInfoRepository: EventInfoRepository) {}

  create(body: CreateEventInfoDto) {
    return this.eventInfoRepository.create(body);
  }

  async findOne() {
    const event = await this.eventInfoRepository.findOne();
    if (!event) throw new NotFoundException('Event not found');
    event.studentBenefits = JSON.parse(event.studentBenefits.toString());
    event.institutionBenefits = JSON.parse(
      event.institutionBenefits.toString(),
    );

    return event;
  }

  async update(body: UpdateEventInfoDto) {
    await this.eventInfoRepository.update(body);
    return { result: 'OK' };
  }

  changeVisibility() {
    return this.eventInfoRepository.changeVisibility();
  }
}
