import { IUserRepository } from '@/application/repositories/user.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';

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
