import { ApiProperty } from '@nestjs/swagger';
import { SubjectType } from '@prisma/client';

export class IContactForm {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: SubjectType, default: SubjectType.other })
  subject?: SubjectType;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'This is a message.' })
  message: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;
}
