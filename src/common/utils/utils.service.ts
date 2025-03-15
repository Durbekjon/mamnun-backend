import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HASH_SALT } from '../hash-salt';
@Injectable()
export class UtilsService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, HASH_SALT);
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
