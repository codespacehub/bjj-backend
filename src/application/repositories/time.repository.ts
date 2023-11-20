import { CreateTimeDto } from '@/infra/http/modules/time/dtos/create-or-update-time.dto';
import { Time } from '../entities/Time';

export interface ITimeRepository {
  create(Time: Time): Promise<Time>;
  remove(timeId: string): Promise<void>;
  findById(time_id: string): Promise<Time>;
  findAll(organization_id: string): Promise<Time[]>;
  update(timeId: string, timeDto: CreateTimeDto): Promise<Time>;
}
