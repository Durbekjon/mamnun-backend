import { PartialType } from '@nestjs/swagger';
import { CreateEventInfoDto } from './create-event-info.dto';

export class UpdateEventInfoDto extends PartialType(CreateEventInfoDto) {}
