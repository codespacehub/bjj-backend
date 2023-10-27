import { IUserRepository } from '@/application/repositories/user.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateGraduationService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: TLoggedUser, newGraduation: string) {
    const { id: userId } = user;

    return this.userRepository.updateGraduation(userId, newGraduation);

    console.log(user, newGraduation);
  }
}
