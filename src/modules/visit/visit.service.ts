import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class VisitService {
  constructor(private prisma: PrismaService) {}

  async addVisit() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    let startDate = new Date(year, month, 1);
    let endDate = new Date(year, month + 1, 1);

    let dbMonth = await this.prisma.visit.findFirst({
      where: {
        date: { gte: startDate, lt: endDate },
      },
    });

    if (!dbMonth) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);

      await this.prisma.visit.updateMany({
        where: { date: { gte: startDate, lt: startDate } },
        data: { visits: [] },
      });

      const newMonth = await this.prisma.visit.create({
        data: { count: 1, date, visits: [date] },
      });

      return newMonth;
    } else {
      return await this.prisma.visit.update({
        where: { id: dbMonth.id },
        data: { count: dbMonth.count + 1, visits: { push: date } },
      });
    }
  }

  async getVisits() {
    return await this.prisma.visit.findMany();
  }

  async clearFullVisits() {
    await this.prisma.visit.deleteMany({});
    return { result: 'OK' };
  }
}
