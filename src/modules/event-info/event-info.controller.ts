import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EventInfoService } from './event-info.service';
import { CreateEventInfoDto } from './dto/create-event-info.dto';
import { UpdateEventInfoDto } from './dto/update-event-info.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller({ path: 'event-info', version: '1' })
export class EventInfoController {
  constructor(private readonly eventInfoService: EventInfoService) {}

  @Post()
  @UseGuards(AtAuthGuard)
  create(@Body() body: CreateEventInfoDto) {
    return this.eventInfoService.create(body);
  }

  @Get()
  findOne() {
    return this.eventInfoService.findOne();
  }

  @Post('visibility')
  @UseGuards(AtAuthGuard)
  changeVisibility() {
    return this.eventInfoService.changeVisibility();
  }

  @Patch()
  @UseGuards(AtAuthGuard)
  update(@Body() body: UpdateEventInfoDto) {
    return this.eventInfoService.update(body);
  }
}
