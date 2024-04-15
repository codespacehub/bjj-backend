import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { IUserRepository } from '@/application/repositories/user.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IMailer') private readonly mailer: IMailer,
    private readonly configService: ConfigService,
  ) {}

  async execute(userEmail: string) {
    const findUserByEmail = await this.userRepository.findByEmail(userEmail);

    // await this.mailer.sendMail({
    //   subject: `🚀 ${findUserByEmail.name}! Esqueceu sua senha? Clique no link abaixo para trocá-la.`,
    //   to: [findUserByEmail.email],
    //   context: {
    //     url: `${this.configService.get('baseUrlFront')}/atualizar?id=${
    //       findUserByEmail.id
    //     }`,
    //   },
    //   template: 'new-password-user',
    // });

    return findUserByEmail;
  }
}
