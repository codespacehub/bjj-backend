import { Inject, Injectable } from '@nestjs/common';

import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IModalityRepository } from '@/application/repositories/modality.repository';

@Injectable()
export class FindAllModalitiesService {
  constructor(
    @Inject('IModalityRepository')
    private readonly modalityRepository: IModalityRepository,
  ) {}

  async execute(user: TLoggedUser) {
    const organization = user.organization;

    return await this.modalityRepository.findAll(organization);
  }
}
