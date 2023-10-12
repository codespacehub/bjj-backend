import { IUserRepository } from '@/application/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class findByIdService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(userId: string) {
    return this.userRepository.findById(userId);
  }
}
