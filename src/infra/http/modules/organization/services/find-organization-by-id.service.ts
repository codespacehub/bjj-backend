import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository } from 'src/application/repositories/organization.repository';

@Injectable()
export class FindOrganizationByIdService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}
  async execute(organizationId: string) {
    const organization =
      await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new NotFoundException(
        '🥲 Essa organização não existe, tente novamente',
      );
    }

    return organization;
  }
}
