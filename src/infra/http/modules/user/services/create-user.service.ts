import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/application/entities/user';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { generateTemporaryPassword } from '@/shared/utils/generate-temporary-password';
import { ConfigService } from '@nestjs/config';

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

    const crypt_password = await generateTemporaryPassword();
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
      email,
      phone,
      payday,
      street,
      modality,
      district,
      birth_date,
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
      email,
      phone,
      payday,
      street,
      password: passwordHash,
      district,
      modality,
      birth_date,
      organization: org,
      amount_class,
      house_number,
    });

    await this.mailer.sendMail({
      subject: `🚀 ${userDto.name}! Chegou seu novo acesso ao Conector Alpha`,
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
