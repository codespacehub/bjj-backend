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

      createdAt: organization.created_at,
    };
  }

  static toDomain(raw: RawOrganization) {
    return {
      id: raw.id,
      name: raw.name,
      cnpj: raw.cnpj,
      phone: raw.phone,
      email: raw.email,
      domain: raw.domain,
    };
  }
}
