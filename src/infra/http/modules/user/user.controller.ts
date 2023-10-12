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
} from '@nestjs/common';

import { CreateUserService } from './services/create-user.service';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { DeleteUserService } from './services/delete-user.service';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { User } from '@/shared/decorators/user.decorator';
import { UpdateUserService } from './services/update-user.service';
import { UpdatePasswordService } from './services/update-password.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly updatePasswordService: UpdatePasswordService,
    private readonly updateGraduation: UpdatePasswordService,
  ) {}

  @Post()
  createUser(@Body() CreateAndUpdateUserDto: CreateAndUpdateUserDto) {
    const {
      cpf,
      name,
      plan,
      role,
      email,
      phone,
      payday,
      modality,
      password,
      birth_date,
      graduation,
      total_class,
      organization,
      color_graduation,
    } = CreateAndUpdateUserDto;

    return this.createUserService.execute({
      cpf,
      name,
      role,
      plan,
      email,
      phone,
      payday,
      modality,
      password,
      birth_date,
      graduation,
      total_class,
      organization,
      color_graduation,
    });
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

  @Patch('graduation')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  updateGraduation(@User()) {}
}
