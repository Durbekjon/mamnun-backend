import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { InformationRepository } from './information.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [InformationController],
  providers: [InformationService, InformationRepository, PrismaService],
})
export class InformationModule {}
