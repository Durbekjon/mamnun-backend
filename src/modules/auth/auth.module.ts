import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRES_IN } from 'src/common/jwt-options';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { UtilsService } from 'src/common/utils/utils.service';
import { AuthService } from './services/auth.service';
import { AuthTokenService } from './services/auth-token.service';
import { JwtStrategy } from './strategies/at.stategy';
import { RtStrategy } from './strategies/rt.stategy';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AuthTokenService,
    AuthRepository,
    UtilsService,
    JwtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
