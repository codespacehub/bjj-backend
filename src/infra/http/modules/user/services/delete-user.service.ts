import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { IUserRepository } from '@/application/repositories/user.repository';
import { IPresenceRepository } from '@/application/repositories/presence.repository';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
  ) {}

  async execute(userId: string) {
    const findUser: any = await this.userRepository.findById(userId);

    if (!findUser) {
      throw new NotFoundException('Usuário informado não existe');
    }

    if (findUser.times.length > 0) {
      throw new ConflictException('Existem horários conectados a esse usuário');
    }

    if (findUser.Presence.length > 0) {
      for (let presence of findUser.Presence) {
        await this.presenceRepository.delete(presence.id);
      }
    }

    return await this.userRepository.remove(userId);
  }
}
