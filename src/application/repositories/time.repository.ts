import { Time } from '../entities/Time';

export interface ITimeRepository {
  findAll(organization_id: string): Promise<Time[]>;
  create(Time: Time): Promise<Time>;
  remove(timeId: string): Promise<void>;
}
