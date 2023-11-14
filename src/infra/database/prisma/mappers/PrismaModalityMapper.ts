import { Modality } from '@/application/entities/modality';

export class PrismaModalityMapper {
  static toPrisma(modality: Modality) {
    return {
      id: modality.id,
      name: modality.name,
      description: modality.description,
      organization_id: modality.organization,
    };
  }
}
