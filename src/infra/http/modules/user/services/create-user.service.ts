import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/application/entities/user';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';
import { generateTemporaryPassword } from '@/shared/utils/generate-temporary-password';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICreateHash')
    private readonly createHashAdapterProvider: ICreateHash,
    @Inject('IMailer') private readonly mailer: IMailer,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    userDto: CreateAndUpdateUserDto,
    user?: TLoggedUser,
  ): Promise<any> {
    const org = user.organization;

    const crypt_password = generateTemporaryPassword();
    const passwordHash =
      await this.createHashAdapterProvider.execute(crypt_password);

    const {
      uf,
      cpf,
      cep,
      name,
      city,
      plan,
      role,
      phone,
      email,
      degree,
      payday,
      street,
      modality,
      district,
      birth_date,
      graduation,
      amount_class,
      house_number,
    } = userDto;
    const new_user = new User({
      uf,
      cpf,
      cep,
      name,
      plan,
      city,
      role,
      degree,
      email,
      phone,
      payday,
      street,
      password: passwordHash,
      district,
      modality,
      birth_date,
      graduation,
      organization_id: org,
      amount_class,
      house_number,
    });

    await this.mailer.sendMail({
      subject: `🚀 ${userDto.name}! Chegou seu novo acesso ao BJJ Stars`,
      to: [userDto.email],
      context: {
        user: userDto.email,
        password: crypt_password,
        url: `${this.configService.get('baseUrlFront')}/autenticacao?email=${
          userDto.email
        }`,
      },
      template: 'credentials-user',
    });

    return await this.userRepository.create(new_user);
  }
}
