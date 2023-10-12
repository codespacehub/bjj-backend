import { Organization } from '@/application/entities/organization';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';

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
