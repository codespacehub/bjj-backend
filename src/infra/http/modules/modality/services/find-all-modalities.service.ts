import { IModalityRepository } from '@/application/repositories/modality.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllModalitiesService {
  constructor(
    @Inject('IModalityRepository')
    private readonly modalityRepository: IModalityRepository,
  ) {}

  execute(user: TLoggedUser) {
    const organization = user.organization;

    return this.modalityRepository.findAll(organization);
  }
}
