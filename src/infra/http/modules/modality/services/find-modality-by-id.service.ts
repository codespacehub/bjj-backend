import { IModalityRepository } from '@/application/repositories/modality.repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FindModalityByIdService {
  constructor(
    @Inject('IModalityRepository')
    private readonly modalityRepository: IModalityRepository,
  ) {}

  async execute(modalityId: string) {
    return this.modalityRepository.findById(modalityId);
  }
}
