import { Modality } from '../entities/modality';

export interface IModalityRepository {
  remove(modalityId: string): Promise<void>;
  findById(modalityId: string): Promise<any>;
  create(modality: Modality): Promise<Modality>;
  findAll(organization: string): Promise<Modality>;
}
