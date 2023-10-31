import { IUserRepository } from '@/application/repositories/user.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class findAllUsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(user: TLoggedUser) {
    const organization = user.organization;

    return this.userRepository.findAll(organization);
  }
}
