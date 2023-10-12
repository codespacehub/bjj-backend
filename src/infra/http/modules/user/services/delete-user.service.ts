import { IUserRepository } from '@/application/repositories/user.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string) {
    return this.userRepository.remove(userId);
  }
}
