import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  Length,
  Matches,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuoteType } from '@prisma/client';

export class CreateQuoteRequestDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the requester',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address of the requester',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number of the requester in E.164 format',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'I am interested in your travel services.',
    description: 'Message from the requester',
    minLength: 10,
    maxLength: 1000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 2000)
  message: string;

  @ApiProperty({
    example: QuoteType.TRAVEL,
    enum: QuoteType,
    description: 'Type of quote requested',
  })
  @IsNotEmpty()
  @IsEnum(QuoteType)
  quoteType: QuoteType;

  @ApiProperty({
    example: 1,
    description: 'ID of the service',
  })
  @IsNotEmpty()
  @IsInt()
  serviceId: number;
}
