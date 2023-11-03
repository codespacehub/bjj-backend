import { Graduation } from '@prisma/client';

export class PrismaModalityMapper {
  static toPrisma(graduation: Graduation) {
    return {
      id: graduation.id,
      name: graduation.name,
      organization: graduation.degree,
      description: graduation.color_degree,
    };
  }
}
