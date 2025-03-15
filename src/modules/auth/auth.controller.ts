import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthService } from './services/auth.service';
import { IUser } from './dto/user.interface';
import { User } from 'src/common/decorators/user.decorator';
import { AtAuthGuard } from './guards/jwt-auth.guard';
import { RtGuard } from './guards/refresh.guard';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
  })
  @ApiBody({ type: LoginDto, description: 'User login credentials' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: LoginResponseDto,
  })
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(AtAuthGuard)
  async whoAmI(@User() user: IUser) {
    return this.authService.whoAmI(user);
  }

  // function for updating user tokens: access and refresh
  @Post('refresh-tokens')
  @UseGuards(RtGuard)
  async refreshTokens(@User() user: IUser) {
    return this.authService.updateTokens(user);
  }
}
