import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesRepository } from './services.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository, PrismaService],
})
export class ServicesModule {}
