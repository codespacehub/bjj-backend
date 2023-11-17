import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { Organization } from '@/application/entities/organization';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { CreateAdminService } from '../../user/services/create-admin.service';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

@Injectable()
export class CreateOrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
    @Inject('IMailer') private readonly mailer: IMailer,
    @Inject('ICreateHash')
    private readonly createHashAdapterProvider: ICreateHash,
    private readonly createAdminService: CreateAdminService,
  ) {}

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
    const password =
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).toUpperCase().slice(2);
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
      payday: 0,
      role: createOrganizationDto.admin ? 'AdminGestor' : 'Admin',
      active: true,
      plan_id: null,
      amount_class: 0,
      modality_id: null,
      graduation_id: null,
      password: passwordHashed,
      organization_id: organization,
      uf: createOrganizationDto.user_master.uf,
      cpf: createOrganizationDto.user_master.cpf,
      cep: createOrganizationDto.user_master.cep,
      name: createOrganizationDto.user_master.name,
      city: createOrganizationDto.user_master.city,
      email: createOrganizationDto.user_master.email,
      phone: createOrganizationDto.user_master.phone,
      street: createOrganizationDto.user_master.street,
      district: createOrganizationDto.user_master.district,
      birth_date: createOrganizationDto.user_master.birth_date,
      house_number: createOrganizationDto.user_master.house_number,
    };
    return await this.createAdminService.execute(content, {
      organization,
    });
  }

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

    if (!createUserResponse) {
      throw new ConflictException(
        '🥲 O usuário não foi criado por favor, verifique se os dados estão corretos.',
      );
    }

    if (createOrganizationResponse.id) {
      await this.mailer.sendMail({
        subject: `🚀 ${createUserResponse.name}! Chegou seu novo acesso ao BJJ Stars`,
        to: [createUserResponse.email],
        context: {
          user: createUserResponse.email,
          password: passwordHashed.password,
          url: 'http://locahost:3000',
        },
        template: 'credentials-user',
      });
    }
  }
}
