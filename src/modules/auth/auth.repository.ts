import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsername(username: string): Promise<UserDto> {
    return this.prismaService.user.findUnique({ where: { username } });
  }

  findById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async createuser(data: { username: string; password: string }) {
    await this.prismaService.user.deleteMany();
    return this.prismaService.user.create({ data });
  }
}
