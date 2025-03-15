import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { LoginDto } from '../dto/login.dto';
import { APP_MESSAGES } from 'src/common/app-messages';
import { UtilsService } from '../../../common/utils/utils.service';
import { AuthTokenService } from './auth-token.service';
import { LoginResponseDto } from '../dto/login-response.dto';
import { IUser } from '../dto/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly utilsService: UtilsService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async login(body: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authRepository.findByUsername(body.username);
    if (!user) {
      throw new BadRequestException(
        APP_MESSAGES.INVALID_USERNAME.replace('_USERNAME_', body.username),
      );
    }
    const isPasswordCorrect = await this.utilsService.comparePassword(
      body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ForbiddenException(APP_MESSAGES.INCORRECT_PASSWORD);
    }

    return this.authTokenService.createTokens(user.id);
  }

  async whoAmI(user: IUser) {
    const data = await this.authRepository.findById(user.id);
    if (!data) {
      throw new UnauthorizedException();
    }

    delete data.password;
    delete data.username;
    return data;
  }

  async updateTokens(user: IUser): Promise<LoginResponseDto> {
    const data = this.authRepository.findById(user.id);
    if (!data) {
      throw new UnauthorizedException();
    }
    return this.authTokenService.createTokens(user.id);
  }
}
