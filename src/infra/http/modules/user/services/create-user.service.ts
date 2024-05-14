import { ConfigService } from '@nestjs/config';
import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';

import { User } from 'src/application/entities/user';
import { Invoice } from '@/application/entities/invoice';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IPlanRepository } from '@/application/repositories/plan.repository';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { generateTemporaryPassword } from '@/shared/utils/generate-temporary-password';

@Injectable()
export class CreateUserService {

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICreateHash')
    private readonly createHashAdapterProvider: ICreateHash,
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
    @Inject('IMailer') private readonly mailer: IMailer,
    private readonly configService: ConfigService,
  ) { }

  async handleCreateUser(
    userDto: CreateAndUpdateUserDto,
    user: TLoggedUser,
    passwordHash: string,
  ) {
    const org = user.organization;

    const findUserExistsEmail = await this.userRepository.findExistUserByEmail(
      userDto.email,
    );

    if (findUserExistsEmail) {
      throw new ConflictException(
        '🥲 O e-mail do usuário já foi utilizado, tente novamente',
      );
    }

    const {
      id,
      uf,
      cpf,
      cep,
      name,
      city,
      role,
      phone,
      email,
      payday,
      street,
      plan_id,
      district,
      photo_url,
      birth_date,
      modality_id,
      amount_class,
      house_number,
      graduation_id,
    } = userDto;
    const new_user = new User({
      id,
      uf,
      cpf: cpf || null,
      cep,
      name,
      plan: plan_id,
      city,
      role,
      email,
      phone,
      payday,
      street,
      password: passwordHash,
      district,
      modality_id: modality_id,
      birth_date,
      graduation_id: graduation_id,
      photo_url: photo_url,
      organization_id: org,
      amount_class,
      house_number,
    });

    return await this.userRepository.create(new_user);
  }

  async handleCreateFirstInvoice(
    user_id: string,
    organization_id: string,
    userCurrentPlan_id: string,
  ) {
    const findCurrentPlan = await this.planRepository.findById(userCurrentPlan_id)

    if (!findCurrentPlan) {
      throw new BadRequestException(
        '🥲 O plano informado não existe!',
      );
    }

    const new_invoice = new Invoice({
      value: Number(findCurrentPlan.value),
      paidDay: '0',
      user_id,
      organization_id,
      paidOut: false,
    })

    await this.invoiceRepository.create(new_invoice)
  }

  async execute(
    userDto: CreateAndUpdateUserDto,
    user?: TLoggedUser,
  ): Promise<any> {


    const crypt_password = generateTemporaryPassword();
    const passwordHash =
      await this.createHashAdapterProvider.execute(crypt_password);
      
      const createUser = await this.handleCreateUser(userDto, user, passwordHash)
      
      const createFirstInvoice = await this.handleCreateFirstInvoice(
        createUser.id, 
        createUser.organization_id, 
        createUser.plan
      )

    if (!createUser) {
      throw new ConflictException(
        '🥲 O usuário não foi criado por favor, verifique se os dados informados estão corretos.',
      );
    }

    await this.mailer.sendMail({
      subject: `🚀 ${userDto.name}! Chegou seu novo acesso ao Gestor Combate`,
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

      return {
        createUser,
        createFirstInvoice
      }
  }
}
