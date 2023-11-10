import { Inject, Injectable } from '@nestjs/common';

import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IUserRepository } from '@/application/repositories/user.repository';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';

@Injectable()
export class UpdatePasswordService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICreateHash')
    private readonly createHashAdapterProvider: ICreateHash,
  ) {}

  async execute(user: TLoggedUser, newPassword: string) {
    const { id: userId } = user;

    const passwordHash =
      await this.createHashAdapterProvider.execute(newPassword);

    return this.userRepository.updatePassword(userId, passwordHash);
  }
}
