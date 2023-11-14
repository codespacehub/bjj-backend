import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { Graduation } from '@/application/entities/graduation';
import { PrismaGraduationMapper } from '../mappers/PrismaGraduationMapper';
import { IPlanRepository } from '@/application/repositories/plan.repository';
import { PrismaPlanMapper } from '../mappers/PrismaPlanMapper';
import { Plan } from '@/application/entities/plan';

@Injectable()
export class PrismaPlanRepository implements IPlanRepository {
  constructor(private prisma: PrismaService) {}

  async create(createPlanDto: Plan): Promise<any> {
    const raw = PrismaPlanMapper.toPrisma(createPlanDto);

    const plan = await this.prisma.plan.create({
      data: raw,
    });

    return plan;
  }

  async findById(planId: string): Promise<any> {
    const plan = await this.prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      return null;
    }

    return plan;
  }

  async findAll(organization_id: string): Promise<any> {
    const plans = await this.prisma.plan.findMany({
      where: {
        organization_id,
      },
      include: {
        users: true,
      },
    });

    return plans;
  }

  async remove(planId: string): Promise<any> {
    return await this.prisma.plan.delete({
      where: {
        id: planId,
      },
    });
  }

  async update(new_graduation: Graduation, planId: string): Promise<any> {
    const updateGraduation = await this.prisma.graduation.update({
      where: {
        id: planId,
      },
      data: {
        name: new_graduation.name,
        color_degree: new_graduation.color_degree,
      },
    });

    return updateGraduation;
  }
}
