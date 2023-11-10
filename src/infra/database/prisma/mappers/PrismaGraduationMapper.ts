import { Graduation } from '@/application/entities/graduation';

export class PrismaGraduationMapper {
  static toPrisma(graduation: Graduation) {
    return {
      id: graduation.id,
      name: graduation.name,
      modality_id: graduation.modality_id,
      color_degree: graduation.color_degree,
    };
  }
}
