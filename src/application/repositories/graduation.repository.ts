import { Graduation } from '../entities/graduation';

export interface IGraduationRepository {
  remove(idGraduation: string): Promise<any>;
  findById(idGraduation: string): Promise<any>;
  findAll(organizationId: string): Promise<any[]>;
  create(new_graduation: Graduation): Promise<any>;
  update(new_graduation: any, idGraduation: string): Promise<any>;
}
