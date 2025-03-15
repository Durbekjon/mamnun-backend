import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IUser } from '../auth/dto/user.interface';
import { ServicesRepository } from './services.repository';
import { APP_MESSAGES } from 'src/common/app-messages';
import { ServiceType } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}
  async create(body: CreateServiceDto, user: IUser) {
    await this.validateUser(user);
    return this.servicesRepository.createService(body);
  }

  findAll(type?: ServiceType) {
    return this.servicesRepository.getAllServices(type);
  }

  async findOne(id: number) {
    const service = await this.servicesRepository.getServiceById(id);
    if (!service) throw new NotFoundException();
    return service;
  }

  async update(id: number, body: UpdateServiceDto, user: IUser) {
    await this.validateUser(user);

    return this.servicesRepository.updateService(id, body);
  }

  async remove(id: number, user: IUser) {
    // Validating user and checking service is exist at the same time using promise.all
    const [_, service] = await Promise.all([
      await this.validateUser(user),
      await this.servicesRepository.getServiceById(id),
    ]);

    if (!service) throw new NotFoundException();

    await this.servicesRepository.deleteService(id);
    return { result: 'OK' };
  }

  private async validateUser(user: IUser): Promise<void> {
    const isUserExist = await this.servicesRepository.getUserById(user.id);

    if (!isUserExist) {
      throw new ForbiddenException(APP_MESSAGES.USER_NOT_AUTHORIZED);
    }
  }
}
