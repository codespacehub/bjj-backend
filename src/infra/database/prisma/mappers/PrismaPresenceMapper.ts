import { Presence } from '@/application/entities/presence';

export class PrismaPresenceMapper {
  static toPrisma(presence: Presence) {
    return {
      id: presence.id,
      day: presence.day,
      confirmation: presence.confirmation,
      
      time_id: presence.time_id,
      user_id: presence.user_id,
      modality_id: presence.modality_id,
      organization_id: presence.organization_id,
    };
  }
}
