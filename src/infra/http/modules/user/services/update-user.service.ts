import { Inject, Injectable } from '@nestjs/common';

import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { IUserRepository } from '@/application/repositories/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: TLoggedUser, updateUserDto: CreateAndUpdateUserDto) {
    const { id: userId } = user;
    return await this.userRepository.update(userId, updateUserDto);
  }
}
