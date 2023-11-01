import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UpdatePasswordService } from './services/update-password.service';
import { UpdateGraduationService } from './services/update-graduation.service';
import { FindUserByIdService } from './services/find-by-id.service';
import { CreateUserOwnerService } from './services/create-user-owner.service';
import { FindAllModalitiesService } from '../modality/services/find-all-modalities.service';
import { findAllUsersService } from './services/find-all-users.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    DeleteUserService,
    UpdateUserService,
    FindUserByIdService,
    findAllUsersService,
    UpdatePasswordService,
    UpdateGraduationService,
    FindAllModalitiesService,
  ],
})
export class UserModule {}
