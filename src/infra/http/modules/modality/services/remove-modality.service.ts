import {
  Inject,
  Injectable,
  NotFoundException,
  NotAcceptableException,
  ConflictException,
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

    if (findModality.users.length > 0) {
      throw new ConflictException(
        'Existem usuários conectados a essa graduação',
      );
    }

    return await this.modalityRepository.remove(modalityId);
  }
}
