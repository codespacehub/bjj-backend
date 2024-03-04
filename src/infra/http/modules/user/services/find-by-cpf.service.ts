import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { IUserRepository } from '@/application/repositories/user.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userCpf: string) {
    const findUserByCpf = await this.userRepository.findByCpf(userCpf);

    return findUserByCpf;
  }
}
