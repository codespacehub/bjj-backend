import { Organization } from '../entities/organization';

export interface IOrganizationRepository {
  create(organization: Organization): Promise<Organization>;
  findById(organizationId: string): Promise<Organization>;
  findByCnpj(name: string): Promise<Organization | null>;
  remove(organizationId: string): Promise<Organization>;
  findAll(): Promise<Organization[]>;
  updateOrganization(
    organizationId: string,
    organization: any,
  ): Promise<Organization | null>;
}
