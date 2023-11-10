import {
  Inject,
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { IModalityRepository } from '@/application/repositories/modality.repository';

@Injectable()
export class RemoveModalityService {
  constructor(
    @Inject('IModalityRepository')
    private readonly modalityRepository: IModalityRepository,
  ) {}

  async execute(modalityId: string) {
    const findModality = await this.modalityRepository.findById(modalityId);

    if (!findModality) {
      throw new NotFoundException('Modalidade informada não existe');
    }

    if (findModality.graduations.length > 0) {
      throw new NotAcceptableException(
        'Remova as graduações vinculadas para depois excluir essa modalidade',
      );
    }

    return await this.modalityRepository.remove(modalityId);
  }
}
