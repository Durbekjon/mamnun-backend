import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from "@prisma/client";


export class ServiceDto {
  @ApiProperty({ example: 1, description: 'ID of the service' })
  id: number;

  @ApiProperty({ example: 'Guided Tour', description: 'Title of the service' })
  title: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL',
  })
  imageUrl: string;

  @ApiProperty({
    example: 'A detailed description of the service',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'travel',
    enum: ServiceType,
    description: 'Type of service',
  })
  type: ServiceType;
}
