import { Organization } from 'src/application/entities/organization';

export class PrismaOrganizationMapper {
  static toPrisma(organization: Organization) {
    return {
      id: organization.id,
    };
  }
}
