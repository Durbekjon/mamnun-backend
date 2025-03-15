import { Controller, Get, Post } from '@nestjs/common';
import { VisitService } from './visit.service';

@Controller({ path: 'visit', version: '1' })
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async add() {
    return this.visitService.addVisit();
  }

  @Post('clear')
  async cleanVisits() {
    return this.visitService.clearFullVisits();
  }

  @Get()
  async getVisits() {
    return this.visitService.getVisits();
  }
}
