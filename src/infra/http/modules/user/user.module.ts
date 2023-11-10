import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { FindUserByIdService } from './services/find-by-id.service';
import { findAllUsersService } from './services/find-all-users.service';
import { UpdatePasswordService } from './services/update-password.service';
import { CreateUserOwnerService } from './services/create-user-owner.service';
import { FindAllModalitiesService } from '../modality/services/find-all-modalities.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    DeleteUserService,
    UpdateUserService,
    FindUserByIdService,
    findAllUsersService,
    UpdatePasswordService,
    CreateUserOwnerService,
    FindAllModalitiesService,
  ],
})
export class UserModule {}
