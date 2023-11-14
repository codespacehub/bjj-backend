import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { User } from '@/shared/decorators/user.decorator';
import { CreateAndUpdateUserDto } from './dtos/create-and-update-user.dto';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { CreateUserService } from './services/create-user.service';
import { FindUserByIdService } from './services/find-by-id.service';
import { findAllUsersService } from './services/find-all-users.service';
import { UpdatePasswordService } from './services/update-password.service';

@ApiTags('Usuário')
@Controller({ version: '1', path: 'users' })
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findAllUsersService: findAllUsersService,
    private readonly updatePasswordService: UpdatePasswordService,
  ) {}

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    return this.findAllUsersService.execute(user);
  }

  @Get(':userId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findById(@Param('userId') userId: string) {
    return this.findUserByIdService.execute(userId);
  }

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createUser(
    @User() user: TLoggedUser,
    @Body() createAndUpdateUserDto: CreateAndUpdateUserDto,
  ) {
    return this.createUserService.execute(createAndUpdateUserDto, user);
  }

  @Delete(':userId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  deleteUser(@Param('userId') userId: string) {
    return this.deleteUserService.execute(userId);
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
}
