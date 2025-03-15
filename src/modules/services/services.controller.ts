import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from '../auth/dto/user.interface';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ServiceType } from '@prisma/client';

@ApiBearerAuth()
@Controller({ path: 'services', version: '1' })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(AtAuthGuard)
  create(@Body() body: CreateServiceDto, @User() user: IUser) {
    return this.servicesService.create(body, user);
  }

  @Get()
  @ApiQuery({
    name: 'type',
    enum: ServiceType,
    required: false,
    description: 'Filter services by type',
  })
  findAll(@Query('type') type?: ServiceType) {
    return this.servicesService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: UpdateServiceDto,
    @User() user: IUser,
  ) {
    return this.servicesService.update(+id, body, user);
  }

  @Delete(':id')
  @UseGuards(AtAuthGuard)
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.servicesService.remove(+id, user);
  }
}
