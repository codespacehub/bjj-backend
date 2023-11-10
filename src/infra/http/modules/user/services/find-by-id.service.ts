import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/application/repositories/user.repository';

@Injectable()
export class FindUserByIdService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(userId: string) {
    return this.userRepository.findById(userId);
  }
}
