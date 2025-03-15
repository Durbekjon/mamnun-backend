import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from 'src/common/jwt-options';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createTokens(userId: number) {
    const accessToken = await this.createAccessToken(userId);
    const refreshToken = await this.createRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createAccessToken(userId: number) {
    const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');

    return await this.jwtService.signAsync({ id: userId }, { secret });
  }

  private async createRefreshToken(userId: number) {
    const expiresIn = REFRESH_TOKEN_EXPIRES_IN;

    return await this.jwtService.signAsync(
      {
        id: userId,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn,
      },
    );
  }
}
