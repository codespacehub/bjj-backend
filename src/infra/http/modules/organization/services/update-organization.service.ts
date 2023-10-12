import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { updateOrganizationDto } from '../dtos/update-organization.dto';
import { Organization } from '@/application/entities/organization';

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

    const { cnpj, domain, email, name, phone } = updateOrg;

    const organization = {
      cnpj,
      domain,
      email,
      name,
      phone,
    };

    return this.organizationRepository.updateOrganization(
      organizationId,
      organization,
    );
  }
}
