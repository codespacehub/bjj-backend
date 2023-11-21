import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { Time } from '../../../../application/entities/time';
import { ITimeRepository } from '@/application/repositories/time.repository';
import { PrismaTimeMapper } from '../mappers/PrismaTimeMapper';
import { CreateTimeDto } from '@/infra/http/modules/time/dtos/create-or-update-time.dto';

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

  async findById(plan_id: string): Promise<any> {
    const time = await this.prisma.time.findUnique({
      where: {
        id: plan_id,
      },
    });

    return time;
  }

  async update(timeId: string, timeDto: CreateTimeDto): Promise<any> {
    const time = await this.prisma.time.update({
      where: {
        id: timeId,
      },
      data: {
        hour: timeDto.hour,
        modality_id: timeDto.modality,
      },
    });

    return time;
  }

  async remove(timeId: string): Promise<any> {
    return await this.prisma.time.delete({
      where: {
        id: timeId,
      },
    });
  }
}
