import { IUserRepository } from '@/application/repositories/user.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateActiveByIdService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(userId: string) {
    const findUser = this.userRepository.findById(userId);

    if (!findUser) {
      throw new NotFoundException('Usuário informado não existe');
    }

    return this.userRepository.updateActiveById(userId);
  }
}
