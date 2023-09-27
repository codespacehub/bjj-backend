export interface IOrganizationRepository {
  findById(organizationId: string): Promise<Organization>;
}
