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

  async execute(user: TLoggedUser, createModality: CreateModalityDto) {
    const modality = new Modality({
      name: createModality.name,
      description: createModality.description,
      organization: user.organization,
    });

    console.log(modality, user);

    return this.modalityRepository.create(modality);
  }
}
