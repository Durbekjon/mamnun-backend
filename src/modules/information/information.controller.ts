import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InformationService } from './information.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IUser } from '../auth/dto/user.interface';
import { User } from 'src/common/decorators/user.decorator';

@ApiBearerAuth()
@Controller({ path: 'information', version: '1' })
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Post()
  @UseGuards(AtAuthGuard)
  create(@Body() body: CreateInformationDto, @User() user: IUser) {
    return this.informationService.create(body, user);
  }

  @Get()
  find() {
    return this.informationService.find();
  }

  @Patch(':id')
  @UseGuards(AtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: UpdateInformationDto,
    @User() user: IUser,
  ) {
    return this.informationService.update(+id, body, user);
  }

  @Delete(':id')
  @UseGuards(AtAuthGuard)
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.informationService.remove(+id, user);
  }
}
