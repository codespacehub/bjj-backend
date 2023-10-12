import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { Organization } from '@/application/entities/organization';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { CreateUserService } from '../../user/services/create-user.service';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';
import { generateTemporaryPassword } from '@/shared/utils/generate-temporary-password';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { IMailer } from '@/shared/interface/mail/mailer.interface';

@Injectable()
export class CreateOrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,

    @Inject('IMailer') private readonly mailer: IMailer,
    @Inject('ICreateHash')
    private readonly createHashAdapterProvider: ICreateHash,

    // Service para criação do usuário
    private readonly createUserService: CreateUserService,
  ) {}

  async execute(createOrganizationDto: CreateOrganizationDto): Promise<any> {
    const findOrganizationExists = await this.organizationRepository.findByCnpj(
      createOrganizationDto.organization_info.cnpj,
    );

    if (findOrganizationExists) {
      throw new ConflictException(
        '🥲 Essa organização já foi criada, tente novamente',
      );
    }

    const createOrganizationResponse = await this.handlerCreateOrganization(
      createOrganizationDto,
    );

    const passwordHashed = await this.handlerGeneratePassword();

    const createUserResponse = await this.handlerCreateUser(
      createOrganizationDto,
      createOrganizationResponse.id,
      passwordHashed.passwordHash,
    );

    if (createOrganizationResponse.id) {
      await this.mailer.sendMail({
        subject: `🚀 ${createOrganizationResponse.name}! Chegou seu novo acesso ao Mioli Jiu Jitsu`,
        to: [createUserResponse.email],
        context: {
          user: createUserResponse.email,
          password: passwordHashed.password,
          url: 'url de login do sistema',
        },
        template: 'credentials-user',
      });
    }

    return {
      response: createOrganizationResponse,
    };
  }

  async handlerCreateOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ) {
    const new_organization = new Organization({
      active: createOrganizationDto.active,
      name: createOrganizationDto.organization_info.name,
      cnpj: createOrganizationDto.organization_info.cnpj,
      phone: createOrganizationDto.organization_info.phone,
      email: createOrganizationDto.organization_info.email,
      domain: createOrganizationDto.organization_info.domain,
    });

    const organization =
      await this.organizationRepository.create(new_organization);

    return organization;
  }

  async handlerGeneratePassword() {
    const password = generateTemporaryPassword();
    const passwordHash = await this.createHashAdapterProvider.execute(password);

    return {
      password,
      passwordHash,
    };
  }

  async handlerCreateUser(
    createOrganizationDto: CreateOrganizationDto,
    organization: string,
    passwordHashed: string,
  ) {
    const content = {
      role: 'Owner',
      organization,
      password: passwordHashed,
      cpf: createOrganizationDto.organization_master.cpf,
      name: createOrganizationDto.organization_master.name,
      plan: createOrganizationDto.organization_master.plan,
      email: createOrganizationDto.organization_master.email,
      phone: createOrganizationDto.organization_master.phone,
      payday: createOrganizationDto.organization_master.payday,
      modality: createOrganizationDto.organization_master.modality,
      birth_date: createOrganizationDto.organization_master.birth_date,
      graduation: createOrganizationDto.organization_master.graduation,
      total_class: createOrganizationDto.organization_master.total_class,
      color_graduation:
        createOrganizationDto.organization_master.color_graduation,
    };

    return await this.createUserService.execute(content);
  }
}
