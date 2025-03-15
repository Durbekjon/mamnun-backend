import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsJSON,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateEventInfoDto {
  @ApiProperty({
    example: 'EduFair 2025',
    description: 'The name of the event',
  })
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @ApiProperty({
    example: '2025-04-06',
    description: 'The event date (YYYY-MM-DD format)',
  })
  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;

  @ApiProperty({ example: '10:00 AM - 6:00 PM', description: 'The event time' })
  @IsNotEmpty()
  @IsString()
  eventTime: string;

  @ApiProperty({
    example: 'Hotel Hyatt Tashkent, Uzbekistan',
    description: 'The location of the event',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    example:
      'This is a fantastic opportunity for both institutions and students...',
    description: 'Event description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: `[{"title": "Explore Diverse Programs", "description": "Students can discover a wide range of educational opportunities."}]`,
    description: 'Array of student benefits',
  })
  @IsNotEmpty()
  @IsJSON()
  studentBenefits: object[] | string;

  @ApiProperty({
    example: `[{"title": "Brand Visibility", "description": "Enhances the institution's visibility in the market."}]`,
    description: 'Array of institution benefits',
  })
  @IsNotEmpty()
  institutionBenefits: object[] | string;

  @ApiProperty({
    example: '2025-04-03',
    description: 'The registration deadline (YYYY-MM-DD format)',
  })
  @IsNotEmpty()
  @IsDateString()
  registrationDeadline: Date;

  @ApiProperty({ example: true, description: 'Visibility of the event' })
  @IsBoolean()
  visible: boolean;
}
