import { Graduation } from '@/application/entities/graduation';

export class PrismaGraduationMapper {
  static toPrisma(graduation: Graduation) {
    return {
      id: graduation.id,
      name: graduation.name,
      order: graduation.order,
      modality_id: graduation.modality_id,
      color_degree: graduation.color_degree,
      amount_class: graduation.amount_class,
      organization_id: graduation.organization_id,
    };
  }
}
