import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { Modality } from '@/application/entities/modality';
import { PrismaModalityMapper } from '../mappers/PrismaModalityMapper';
import { IModalityRepository } from '@/application/repositories/modality.repository';
import { CreateOrUpdateModalityDto } from '@/infra/http/modules/modality/dto/create-or-update-modality.dto';

@Injectable()
export class PrismaModalityRepository implements IModalityRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(organization_id: string): Promise<any> {
    const modalities = this.prisma.modality.findMany({
      where: {
        organization_id,
      },
      include: {
        graduations: true,
        times: true,
        users: true,
      },
    });

    return modalities;
  }

  async findById(modalityId: string): Promise<any> {
    const modality = await this.prisma.modality.findUnique({
      where: {
        id: modalityId,
      },
      include: {
        graduations: true,
        users: true,
      },
    });

    if (!modality) {
      return null;
    }

    return modality;
  }

  async create(modality: Modality): Promise<any> {
    const raw = PrismaModalityMapper.toPrisma(modality);

    return await this.prisma.modality.create({
      data: raw,
      include: {
        Organization: true,
      },
    });
  }

  async remove(modalityId: string) {
    await this.prisma.modality.delete({
      where: {
        id: modalityId,
      },
    });
  }

  async update(modalityId: string, modalityDto: CreateOrUpdateModalityDto) {
    const updateModality = await this.prisma.modality.update({
      where: {
        id: modalityId,
      },
      data: {
        name: modalityDto.name,
        description: modalityDto.description,
      },
    });
  }
}
