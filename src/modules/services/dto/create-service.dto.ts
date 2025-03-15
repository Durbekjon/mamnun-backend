import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export enum ServiceType {
  EDU = 'edu',
  TRAVEL = 'travel',
}

export class CreateServiceDto {
  @ApiProperty({ example: 'Guided Tour', description: 'Title of the service' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL',
  })
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    example: 'A detailed description of the service',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'travel',
    enum: ServiceType,
    description: 'Type of service',
  })
  @IsEnum(ServiceType)
  @IsNotEmpty()
  type: ServiceType;
}
