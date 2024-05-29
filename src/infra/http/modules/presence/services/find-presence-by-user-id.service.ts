import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IPresenceRepository } from '@/application/repositories/presence.repository';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/PrismaUserRepository';

@Injectable()
export class FindPresenceByUserIdService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: PrismaUserRepository,
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
  ) {}

  async execute(user_id: string) {
    let findUser = await this.userRepository.findById(user_id);

    if (!findUser) {
      throw new ConflictException(
        '🥲 Esse usuário não existe, tente novamente',
      );
    }
    return await this.presenceRepository.findByUserId(user_id);
  }
}