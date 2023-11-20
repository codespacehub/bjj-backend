import { Inject, Injectable } from '@nestjs/common';
import { IPresenceRepository } from '@/application/repositories/presence.repository';

@Injectable()
export class DeletePresenceService {
  constructor(
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
  ) {}

  async execute(presenceId: string) {
    return await this.presenceRepository.delete(presenceId);
  }
}
