import { IUserRepository } from '@/application/repositories/user.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';

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
