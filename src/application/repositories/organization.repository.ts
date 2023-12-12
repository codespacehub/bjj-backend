import { Organization } from '../entities/organization';

export interface IOrganizationRepository {
  updateOrganization(
    organizationId: string,
    organization: any,
  ): Promise<Organization | null>;
  findAll(): Promise<Organization[]>;
  remove(organizationId: string): Promise<Organization>;
  findByCnpj(name: string): Promise<Organization | null>;
  findById(organizationId: string): Promise<Organization>;
  create(organization: Organization): Promise<Organization>;
}
