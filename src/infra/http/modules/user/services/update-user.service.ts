import { Inject, Injectable } from '@nestjs/common';

import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { IUserRepository } from '@/application/repositories/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, updateUserDto: CreateAndUpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }
}
