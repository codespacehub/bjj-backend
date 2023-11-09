import { Graduation } from '@/application/entities/graduation';

export class PrismaGraduationMapper {
  static toPrisma(graduation: Graduation) {
    return {
      id: graduation.id,
      name: graduation.name,
      color_degree: graduation.color_degree,
    };
  }
}
