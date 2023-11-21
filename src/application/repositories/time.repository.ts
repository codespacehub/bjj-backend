import { CreateTimeDto } from '@/infra/http/modules/time/dtos/create-or-update-time.dto';

export interface ITimeRepository {
  create(Time: any): Promise<any>;
  remove(timeId: string): Promise<void>;
  findById(time_id: string): Promise<any>;
  findAll(organization_id: string): Promise<any[]>;
  update(timeId: string, timeDto: CreateTimeDto): Promise<any>;
}
