import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateInformationDto {
  @ApiProperty({ example: '+998901234567', description: 'User phone number' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  mail: string;

  @ApiPropertyOptional({
    example: 'Tashkent, Uzbekistan',
    description: 'User address',
  })
  @IsString()
  address: string;
}
