import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { updateOrganizationDto } from '../dtos/update-organization.dto';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

@Injectable()
export class UpdateOrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(organizationId: string, updateOrg: updateOrganizationDto) {
    const findOrganization =
      await this.organizationRepository.findById(organizationId);

    if (!findOrganization) {
      throw new NotFoundException('Organização não encontrada meu faixa preta');
    }

    const { cnpj, domain, email, name, phone, payment_value, payment_method_value } = updateOrg;

    const organization = {
      cnpj,
      domain,
      email,
      name,
      phone,
      payment_value,
      payment_method_value,
    };

    return this.organizationRepository.updateOrganization(
      organizationId,
      organization,
    );
  }
}
