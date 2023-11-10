import { Inject, Injectable } from '@nestjs/common';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IUserRepository } from '@/application/repositories/user.repository';

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
