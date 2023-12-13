import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { LoginService } from './services/login.service';
import { LoginNoAuthService } from './services/login-no-auth.service';

@Module({
  controllers: [AuthController],
  providers: [LoginService, LoginNoAuthService],
})
export class AuthModule {}
