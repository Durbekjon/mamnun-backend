import { User } from '@prisma/client';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class UserDto implements User {
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  id: number;

  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  username: string;

  @ApiHideProperty()
  password: string;
}
