import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [VisitController],
  providers: [VisitService, PrismaService],
})
export class VisitModule {}
