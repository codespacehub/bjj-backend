import { Organization } from '../entities/organization';

export interface IOrganizationRepository {
  findAll(): Promise<Organization[]>;
  remove(organizationId: string): Promise<Organization>;
  findByCnpj(name: string): Promise<Organization | null>;
  findById(organizationId: string): Promise<Organization>;
  create(organization: Organization): Promise<Organization>;
  updateOrganization(
    organizationId: string,
    organization: any,
  ): Promise<Organization | null>;
}
