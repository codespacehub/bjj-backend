import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { FindUserByIdService } from './services/find-by-id.service';
import { findAllUsersService } from './services/find-all-users.service';
import { UpdatePasswordService } from './services/update-password.service';
import { FindAllModalitiesService } from '../modality/services/find-all-modalities.service';
import { FindUserByEmailService } from './services/find-by-email.service';
import { UpdatePasswordByIdService } from './services/update-password-by-id.service';
import { CheckPaydayUserService } from './services/check-payday-user.service';
import { UpdateActiveByIdService } from './services/update-active-user.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    DeleteUserService,
    UpdateUserService,
    FindUserByIdService,
    findAllUsersService,
    UpdatePasswordService,
    CheckPaydayUserService,
    FindUserByEmailService,
    UpdateActiveByIdService,
    FindAllModalitiesService,
    UpdatePasswordByIdService,
  ],
})
export class UserModule {}
