import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { Time } from '@/application/entities/Time';
import { ITimeRepository } from '@/application/repositories/time.repository';
import { PrismaTimeMapper } from '../mappers/PrismaTimeMapper';

@Injectable()
export class PrismaTimeRepository implements ITimeRepository {
  constructor(private prisma: PrismaService) {}

  async create(time: Time): Promise<any> {
    const raw = PrismaTimeMapper.toPrisma(time);

    return await this.prisma.time.create({
      data: raw,
    });
  }

  async findAll(organization_id: string): Promise<any> {
    return await this.prisma.time.findMany({
      where: {
        organization_id: organization_id,
      },
      include: {
        Modality: true,
      },
    });
  }

  async remove(timeId: string): Promise<any> {
    return await this.prisma.time.delete({
      where: {
        id: timeId,
      },
    });
  }
}
