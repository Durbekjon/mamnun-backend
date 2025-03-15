import { Module } from '@nestjs/common';
import { EventInfoService } from './event-info.service';
import { EventInfoController } from './event-info.controller';
import { EventInfoRepository } from './event-info.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [EventInfoController],
  providers: [EventInfoService, EventInfoRepository, PrismaService],
})
export class EventInfoModule {}
