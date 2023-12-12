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

import { Cron, CronExpression } from '@nestjs/schedule';
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
import { FindUserByEmailService } from './services/find-by-email.service';
import { UpdatePasswordByIdService } from './services/update-password-by-id.service';
import { CheckPaydayUserService } from './services/check-payday-user.service';

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
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly checkPaydayUserService: CheckPaydayUserService,
    private readonly updatePasswordByIdService: UpdatePasswordByIdService,
  ) {}

  @Cron('0 9 * * *')
  @Get('check')
  checkPaydayUser() {
    return this.checkPaydayUserService.execute();
  }

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

  @Get('email/:userEmail')
  findByEmail(@Param('userEmail') userEmail: string) {
    return this.findUserByEmailService.execute(userEmail);
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

  @Patch('update/:userId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  async updateUser(
    @User() user: TLoggedUser,
    @Param('userId') userId: string,
    @Body() updateUserDto: CreateAndUpdateUserDto,
  ) {
    return this.updateUserService.execute(userId, updateUserDto);
  }

  @Patch('password')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  updatePassword(
    @User() user: TLoggedUser,
    @Body('newPassword') newPassword: any,
  ) {
    return this.updatePasswordService.execute(user, newPassword);
  }

  @Patch('password/:userId')
  updatePasswordById(
    @Param('userId') userId: string,
    @Body('newPassword') newPassword: any,
  ) {
    return this.updatePasswordByIdService.execute(userId, newPassword);
  }
}
