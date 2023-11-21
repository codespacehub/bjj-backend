import { Time } from '../../../../application/entities/time';

export class PrismaTimeMapper {
  static toPrisma(time: Time) {
    return {
      id: time.id,
      hour: time.hour,
      modality_id: time.modality,
      organization_id: time.organization,
    };
  }
}
