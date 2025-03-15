import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { IUser } from '../auth/dto/user.interface';
import { InformationRepository } from './information.repository';
import { APP_MESSAGES } from 'src/common/app-messages';
import { InformationDto } from './dto/information.dto';

@Injectable()
export class InformationService {
  constructor(private readonly informationRepository: InformationRepository) {}

  async create(
    body: CreateInformationDto,
    user: IUser,
  ): Promise<InformationDto> {
    await this.validateUser(user);

    if (await this.informationRepository.findOne()) {
      throw new BadRequestException(APP_MESSAGES.INFORMATION_EXIST);
    }

    return this.informationRepository.create(body);
  }

  async find(): Promise<InformationDto> {
    const information = await this.informationRepository.findOne();
    if (!information) {
      throw new NotFoundException(APP_MESSAGES.NO_DATA_FOUND);
    }
    return information;
  }

  async update(
    id: number,
    body: UpdateInformationDto,
    user: IUser,
  ): Promise<InformationDto> {
    await this.validateUser(user);
    const information = await this.informationRepository.findOne();
    if (!information) {
      throw new NotFoundException(APP_MESSAGES.NO_DATA_FOUND);
    }
    return this.informationRepository.update(id, body);
  }

  async remove(id: number, user: IUser): Promise<{ result: string }> {
    await this.validateUser(user);
    const information = await this.informationRepository.findOne();
    if (!information) {
      throw new NotFoundException(APP_MESSAGES.NO_DATA_FOUND);
    }
    await this.informationRepository.delete(id);

    return { result: 'OK' };
  }

  private async validateUser(user: IUser): Promise<void> {
    const isUserExist = await this.informationRepository.getUserById(user.id);
    if (!isUserExist) {
      throw new ForbiddenException(APP_MESSAGES.USER_NOT_AUTHORIZED);
    }
  }
}
