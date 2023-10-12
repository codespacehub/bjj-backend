import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UpdatePasswordService } from './services/update-password.service';
import { UpdateGraduationService } from './services/update-graduation.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    DeleteUserService,
    UpdateUserService,
    UpdatePasswordService,
    UpdateGraduationService,
  ],
})
export class UserModule {}
