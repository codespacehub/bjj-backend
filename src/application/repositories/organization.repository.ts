import { Organization } from '@prisma/client';

export interface IOrganizationRepository {
  findById(organizationId: string): Promise<Organization>;
}
