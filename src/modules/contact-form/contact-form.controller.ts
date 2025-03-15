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
import { ContactFormService } from './contact-form.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IUser } from '../auth/dto/user.interface';
import { User } from 'src/common/decorators/user.decorator';
@ApiTags('Contact Form')
@Controller({ path: 'contact-form', version: '1' })
@ApiBearerAuth()
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Post()
  create(@Body() body: CreateContactFormDto) {
    return this.contactFormService.create(body);
  }

  @Get()
  @UseGuards(AtAuthGuard)
  findAll(@User() user: IUser) {
    return this.contactFormService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AtAuthGuard)
  findOne(@Param('id') id: string, @User() user: IUser) {
    return this.contactFormService.findOne(+id, user);
  }

  @Delete(':id')
  @UseGuards(AtAuthGuard)
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.contactFormService.remove(+id, user);
  }
}
