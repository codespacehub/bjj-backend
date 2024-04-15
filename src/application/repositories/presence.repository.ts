import { Presence } from '../entities/presence';

export interface IPresenceRepository {
  delete(presenceId: string): Promise<void>;
  create(Presence: Presence): Promise<Presence>;
  findAll(organization_id: string): Promise<Presence[]>;
  updateConfirmation(presenceId: string): Promise<Presence>
  findByDate(date: string, organization_id: string): Promise<Presence>;
}
