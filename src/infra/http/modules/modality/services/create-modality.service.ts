import { IModalityRepository } from '@/application/repositories/modality.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateModalityDto } from '../dto/CreateModalityDto';
import { Modality } from '@/application/entities/modality';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

@Injectable()
export class CreateModalityService {
  constructor(
    @Inject('IModalityRepository')
    private readonly modalityRepository: IModalityRepository,
  ) {}

  async execute(user: TLoggedUser, createModalityDto: CreateModalityDto) {
    const modality = new Modality({
      name: createModalityDto.name,
      description: createModalityDto.description,
      organization: user.organization,
    });

    return this.modalityRepository.create(modality);
  }
}
