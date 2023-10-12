import { Organization } from 'src/application/entities/organization';
import { Organization as RawOrganization } from '@prisma/client';
export class PrismaOrganizationMapper {
  static toPrisma(organization: Organization) {
    return {
      id: organization.id,
      name: organization.name,
      cnpj: organization.cnpj,
      phone: organization.phone,
      email: organization.email,
      domain: organization.domain,
      active: organization.active,

      created_at: organization.created_at,
    };
  }

  static toDomain(raw: RawOrganization): any {
    return {
      id: raw.id,
      active: raw.active,

      organization_info: {
        name: raw.name,
        cnpj: raw.cnpj,
        email: raw.email,
        phone: raw.phone,
        domain: raw.domain,
      },
    };
  }
}
