import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { Organization } from 'src/application/entities/organization';
import { PrismaOrganizationMapper } from '../mappers/PrismaOrganizationMapper';
import { IOrganizationRepository } from 'src/application/repositories/organization.repository';

@Injectable()
export class PrismaOrganizationRepository implements IOrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(organizationId: string): Promise<any> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
      include: {
        users: true,
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }

  async create(organization: Organization): Promise<any> {
    const raw = PrismaOrganizationMapper.toPrisma(organization);

    return await this.prisma.organization.create({
      data: raw,
    });
  }

  findByCnpj(cnpj: string): Promise<any> {
    const organization = this.prisma.organization.findUnique({
      where: {
        cnpj,
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }

  async updateOrganization(
    organizationId: string,
    organization: Organization,
  ): Promise<any> {
    const updateOrganization = await this.prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        name: organization.name,
        cnpj: organization.cnpj,
        email: organization.email,
        phone: organization.phone,
        domain: organization.domain,
      },
    });

    return updateOrganization;
  }

  async remove(organizationId: string): Promise<any> {
    await this.prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  }

  async findAll(): Promise<any[]> {
    const organization = await this.prisma.organization.findMany({});

    return organization;
  }
}
