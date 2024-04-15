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
import { eachDayOfInterval, endOfWeek, getDay, getWeek, startOfWeek } from 'date-fns';

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

    const { day, time_id, user_id, modality_id, confirmation } = presenceDto;

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

    const getPresences = await this.presenceRepository.findAll(user.organization)
    const weekStarted = startOfWeek(new Date())
    const weekEnd = endOfWeek(new Date())

    let presenceUsers = []

    for (let presence of getPresences) {
      if (presence.user_id === user.id) {
        
        presenceUsers.push(presence)
      }
    }

    const filterPresencesByStartWeekAndEndWeek = presenceUsers.filter(obj => {
      const dateCreate = obj.created_at
      return dateCreate >= weekStarted && dateCreate <= weekEnd
    })
    

    if (filterPresencesByStartWeekAndEndWeek.length - findUser.Plan.limit <=0) {
      const newPresence = new Presence({
        day,
        time_id,
        user_id,
        modality_id,
        confirmation,
        organization_id: org,
      });
  
      const presence = await this.presenceRepository.create(newPresence);
      const updateClass = await this.userRepository.updateAmountClass(user_id);
  
      return {
        presence,
        updateClass,
      };
    } else {
      throw new BadRequestException("Você já atingiu a quantidade de presenças da semana.")
    }
  }
}
