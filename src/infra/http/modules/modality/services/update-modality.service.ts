import { Injectable, Inject, ConflictException } from '@nestjs/common';

import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { CreateOrUpdateModalityDto } from '../dto/create-or-update-modality.dto';
import { IModalityRepository } from '@/application/repositories/modality.repository';

@Injectable()
export class UpdateModalityService {
  constructor(
    @Inject('IModalityRepository')
    private readonly modalityRepository: IModalityRepository,
  ) {}

  async execute(modalityId: string, modalityDto: CreateOrUpdateModalityDto) {
    const findModality = await this.modalityRepository.findById(modalityId);

    if (!findModality) {
      throw new ConflictException(
        '🥲 Essa modalidade não existe, tente novamente',
      );
    }

    return this.modalityRepository.update(modalityId, modalityDto);
  }
}
