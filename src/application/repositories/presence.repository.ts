import { Presence } from '../entities/presence';

export interface IPresenceRepository {
  findByDate(date: string, organization_id: string): Promise<Presence>;
  create(Presence: Presence): Promise<Presence>;
  findAll(organization_id: string): Promise<Presence[]>;
}
