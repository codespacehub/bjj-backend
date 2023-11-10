import { Inject, Injectable } from '@nestjs/common';

import { Modality } from '@/application/entities/modality';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { CreateOrUpdateModalityDto } from '../dto/create-or-update-modality.dto';
import { IModalityRepository } from '@/application/repositories/modality.repository';

@Injectable()
export class CreateModalityService {
  constructor(
    @Inject('IModalityRepository')
    private readonly modalityRepository: IModalityRepository,
  ) {}

  async execute(user: TLoggedUser, createModality: CreateOrUpdateModalityDto) {
    const modality = new Modality({
      name: createModality.name,
      organization: user.organization,
      description: createModality.description,
    });

    return this.modalityRepository.create(modality);
  }
}
