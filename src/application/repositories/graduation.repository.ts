import { Graduation } from '../entities/graduation';

export interface IGraduationRepository {
  findAll(organizationId: string): Promise<Graduation[]>;
  remove(idGraduation: string): Promise<Graduation>;
  findById(idGraduation: string): Promise<Graduation>;
  create(new_graduation: Graduation): Promise<Graduation>;
  update(new_graduation: any, idGraduation: string): Promise<Graduation>;
}
