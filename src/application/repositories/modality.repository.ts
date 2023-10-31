import { Modality } from '../entities/modality';

export interface IModalityRepository {
  create(modality: Modality): Promise<Modality>;
  findAll(organization: string): Promise<Modality>;
}
