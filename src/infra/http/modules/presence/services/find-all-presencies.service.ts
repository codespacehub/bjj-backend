import { Inject, Injectable } from '@nestjs/common';
import { IPresenceRepository } from '@/application/repositories/presence.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

@Injectable()
export class FindAllPresenciesService {
  constructor(
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
  ) {}

  execute(user: TLoggedUser) {
    const organization_id = user.organization;

    return this.presenceRepository.findAll(organization_id);
  }
}
