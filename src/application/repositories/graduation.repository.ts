import { Graduation } from '../entities/graduation';

export interface IGraduationRepository {
  create(new_graduation: Graduation): Promise<Graduation>;
  update(new_graduation: any, idGraduation: string): Promise<Graduation>;
  findAll(): Promise<Graduation[]>;
  findById(idGraduation: string): Promise<Graduation>;
  remove(idGraduation: string): Promise<Graduation>;
}
