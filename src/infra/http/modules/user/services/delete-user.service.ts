import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/application/repositories/user.repository';

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
