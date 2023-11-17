import { Inject, Injectable } from '@nestjs/common';
import { IPresenceRepository } from '@/application/repositories/presence.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

@Injectable()
export class FindByDatePresenceService {
  constructor(
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
  ) {}

  execute(user: TLoggedUser, date: string) {
    const organization_id = user.organization;
    return this.presenceRepository.findByDate(date, organization_id);
  }
}
