import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from 'src/application/repositories/organization.repository';
import { PrismaService } from '../prisma.service';
import { PrismaOrganizationMapper } from '../mappers/PrismaOrganizationMapper';
import { Organization } from 'src/application/entities/organization';

@Injectable()
export class PrismaOrganizationRepository implements IOrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(organizationId: string): Promise<any> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }
}
