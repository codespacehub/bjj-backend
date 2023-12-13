import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { JwtAuthzGuard } from './guards/auth-guard';
import { LoginService } from './services/login.service';

import { User } from 'src/shared/decorators/user.decorator';
import { TLoggedUser } from 'src/shared/interface/user/logged-user.interface';
import { LoginNoAuthService } from './services/login-no-auth.service';

@ApiTags('Autenticação')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly loginNoAuthService: LoginNoAuthService,
  ) {}

  @Post('login')
  login(@Body() loginDto: any) {
    return this.loginService.execute(loginDto);
  }

  @Get('login-no-auth')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  loginNoAuth(@User() user: TLoggedUser) {
    return this.loginNoAuthService.execute(user);
  }

  @Get('profile')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  profile(@User() user: TLoggedUser) {
    return user;
  }
}
