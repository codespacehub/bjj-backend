import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Presence } from '@/application/entities/presence';
import { CreatePresenceDto } from '../dtos/create-presence.dto';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IPresenceRepository } from '@/application/repositories/presence.repository';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/PrismaUserRepository';

@Injectable()
export class CreatePresenceService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: PrismaUserRepository,
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
  ) {}

  async execute(user: TLoggedUser, presenceDto: CreatePresenceDto) {
    const org = user.organization;

    const { day, time_id, user_id, modality_id } = presenceDto;

    let findUser = await this.userRepository.findById(user_id);

    if (!findUser) {
      throw new ConflictException(
        '🥲 Esse usuário não existe, tente novamente',
      );
    }

    if (!findUser.active) {
      throw new UnauthorizedException(
        'Esse usuário está em débito com a academia',
      );
    }

    const newPresence = new Presence({
      day,
      time_id,
      user_id,
      organization_id: org,
      modality_id,
    });

    const presence = await this.presenceRepository.create(newPresence);
    const updateClass = await this.userRepository.updateAmountClass(user_id);

    return {
      presence,
      updateClass,
    };
  }
}
