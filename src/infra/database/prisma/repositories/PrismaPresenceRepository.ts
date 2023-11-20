import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { IPresenceRepository } from '@/application/repositories/presence.repository';
import { Presence } from '@/application/entities/presence';
import { PrismaPresenceMapper } from '../mappers/PrismaPresenceMapper';

@Injectable()
export class PrismaPresenceRepository implements IPresenceRepository {
  constructor(private prisma: PrismaService) {}

  async create(presence: Presence): Promise<any> {
    const raw = PrismaPresenceMapper.toPrisma(presence);

    return await this.prisma.presence.create({
      data: raw,
    });
  }

  async findByDate(day: string, organization_id: string): Promise<any> {
    return await this.prisma.presence.findMany({
      where: {
        organization_id,
        day,
      },
    });
  }

  async findAll(organization_id: string): Promise<any[]> {
    return await this.prisma.presence.findMany({
      where: {
        organization_id,
      },
      include: {
        User: true,
        Time: true,
      },
    });
  }

  async delete(presenceId: string): Promise<any> {
    const findPresence = await this.prisma.presence.findUnique({
      where: {
        id: presenceId,
      },
    });

    if (!findPresence) {
      return null;
    }

    await this.prisma.presence.delete({
      where: {
        id: presenceId,
      },
    });
  }
}
