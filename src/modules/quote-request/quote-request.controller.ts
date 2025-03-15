import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QuoteRequestService } from './quote-request.service';
import { CreateQuoteRequestDto } from './dto/create-quote-request.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from '../auth/dto/user.interface';

@ApiTags('Quote Requests')
@ApiBearerAuth()
@Controller({ path: 'quote-request', version: '1' })
export class QuoteRequestController {
  constructor(private readonly quoteRequestService: QuoteRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quote request' })
  @ApiResponse({
    status: 201,
    description: 'Quote request created successfully',
  })
  async create(@Body() body: CreateQuoteRequestDto) {
    return await this.quoteRequestService.create(body);
  }

  @Get()
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Retrieve all quote requests' })
  @ApiResponse({ status: 200, description: 'List of quote requests' })
  async findAll(@User() user: IUser) {
    return await this.quoteRequestService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Retrieve a single quote request by ID' })
  @ApiResponse({ status: 200, description: 'Quote request found' })
  @ApiResponse({ status: 404, description: 'Quote request not found' })
  async findOne(@Param('id') id: string, @User() user: IUser) {
    return await this.quoteRequestService.findOne(+id, user);
  }

  @Delete(':id')
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Delete a quote request' })
  @ApiResponse({
    status: 200,
    description: 'Quote request deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Quote request not found' })
  async remove(@Param('id') id: string, @User() user: IUser) {
    return await this.quoteRequestService.remove(+id, user);
  }
}
