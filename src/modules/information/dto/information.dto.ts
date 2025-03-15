import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InformationDto {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  id: number;

  @ApiProperty({ example: '+998901234567', description: 'User phone number' })
  phoneNumber: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  mail: string;

  @ApiPropertyOptional({
    example: 'Tashkent, Uzbekistan',
    description: 'User address',
  })
  address?: string;
}
