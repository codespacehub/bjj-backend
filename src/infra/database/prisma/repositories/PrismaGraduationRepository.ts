import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import { Graduation } from '@/application/entities/graduation';
import { PrismaGraduationMapper } from '../mappers/PrismaGraduationMapper';

@Injectable()
export class PrismaGraduationRepository implements IGraduationRepository {
  constructor(private prisma: PrismaService) {}

  async create(newGraduation: Graduation): Promise<any> {
    const raw = PrismaGraduationMapper.toPrisma(newGraduation);

    const new_graduation = await this.prisma.graduation.create({
      data: raw,
    });

    return new_graduation;
  }

  async findById(id: string): Promise<any> {
    const graduation = await this.prisma.graduation.findUnique({
      where: {
        id,
      },
    });

    if (!graduation) {
      return null;
    }

    return graduation;
  }
  async findAll(): Promise<any[]> {
    const graduations = await this.prisma.graduation.findMany({});

    return graduations;
  }

  async remove(id: string): Promise<any> {
    return await this.prisma.graduation.delete({
      where: {
        id,
      },
    });
  }

  async update(new_graduation: Graduation, id: string): Promise<any> {
    const updateGraduation = await this.prisma.graduation.update({
      where: {
        id,
      },
      data: {
        name: new_graduation.name,
        color_degree: new_graduation.color_degree,
      },
    });

    return updateGraduation;
  }
}