import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteRequestDto } from './dto/create-quote-request.dto';
import { QuoteRequest } from '@prisma/client';
import { QuoteRequestRepository } from './quote-request.repository';
import { IUser } from '../auth/dto/user.interface';

@Injectable()
export class QuoteRequestService {
  constructor(
    private readonly quoteRequestRepository: QuoteRequestRepository,
  ) {}

  async create(body: CreateQuoteRequestDto): Promise<QuoteRequest> {
    return this.quoteRequestRepository.create(body);
  }

  async findAll(user: IUser) {
    return this.quoteRequestRepository.findAll();
  }

  async findOne(id: number, user: IUser): Promise<QuoteRequest> {
    const data = this.quoteRequestRepository.findOne(id);

    if (!data) throw new NotFoundException();
    return data;
  }

  // Delete a quote request by ID
  async remove(id: number, user: IUser): Promise<{ result: string }> {
    const data = await this.quoteRequestRepository.findOne(id);

    if (!data) throw new NotFoundException();
    await this.quoteRequestRepository.delete(id);
    return { result: 'OK' };
  }
}
