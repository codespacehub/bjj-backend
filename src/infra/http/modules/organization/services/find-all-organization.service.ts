import { Inject, Injectable } from '@nestjs/common';

import { Organization } from '@/application/entities/organization';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

@Injectable()
export class FindAllOrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  execute(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }
}
