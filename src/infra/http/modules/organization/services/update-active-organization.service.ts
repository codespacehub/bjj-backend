import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateActiveByIdService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  execute(organizationId: string) {
    const findOrganization =
      this.organizationRepository.findById(organizationId);

    if (!findOrganization) {
      throw new NotFoundException('Organização informada não existe');
    }

    return this.organizationRepository.updateActiveById(organizationId);
  }
}
