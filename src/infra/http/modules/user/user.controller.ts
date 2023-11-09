import { CreateAndUpdateUserDto } from './dtos/create-and-update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Patch,
  Put,
  UseGuards,
  Get,
} from '@nestjs/common';

import { CreateUserService } from './services/create-user.service';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { DeleteUserService } from './services/delete-user.service';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { User } from '@/shared/decorators/user.decorator';
import { UpdateUserService } from './services/update-user.service';
import { UpdatePasswordService } from './services/update-password.service';
import { FindUserByIdService } from './services/find-by-id.service';
import { findAllUsersService } from './services/find-all-users.service';
import { CreateUserOwnerService } from './services/create-user-owner.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findAllUsersService: findAllUsersService,
    private readonly updatePasswordService: UpdatePasswordService,
    private readonly createUserOwnerService: CreateUserOwnerService,
  ) {}

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createUserOwner(@Body() createAndUpdateUserDto: CreateAndUpdateUserDto) {
    return this.createUserOwnerService.execute(createAndUpdateUserDto);
  }

  @Post()
  createUser(
    @User() user: TLoggedUser,
    @Body() createAndUpdateUserDto: CreateAndUpdateUserDto,
  ) {
    return this.createUserService.execute(createAndUpdateUserDto, user);
  }

  @Delete(':UserId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  deleteUser(@Param('UserId') UserId: string) {
    return this.deleteUserService.execute(UserId);
  }

  @Patch()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  async updateUser(
    @User() user: TLoggedUser,
    @Body() updateUserDto: CreateAndUpdateUserDto,
  ) {
    return this.updateUserService.execute(user, updateUserDto);
  }

  @Patch('password')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  updatePassword(
    @User() user: TLoggedUser,
    @Body('newPassword') newPassword: string,
  ) {
    return this.updatePasswordService.execute(user, newPassword);
  }

  @Get(':userId')
  findById(@Param('userId') userId: string) {
    return this.findUserByIdService.execute(userId);
  }

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    console.log(user);
    return this.findAllUsersService.execute(user);
  }
}
