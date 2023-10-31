import { IModalityRepository } from '@/application/repositories/modality.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Modality } from '@/application/entities/modality';
import { PrismaModalityMapper } from '../mappers/PrismaModalityMapper';

@Injectable()
export class PrismaModalityRepository implements IModalityRepository {
  constructor(private prisma: PrismaService) {}

  async create(modality: Modality): Promise<any> {
    const raw = PrismaModalityMapper.toPrisma(modality);

    return await this.prisma.modality.create({
      data: raw,
      include: {
        Organization: true,
      },
    });
  }

  async findAll(organizationId: string): Promise<any> {
    const modalities = this.prisma.modality.findMany({
      where: {
        organization: organizationId,
      },
    });

    return modalities;
  }
}
