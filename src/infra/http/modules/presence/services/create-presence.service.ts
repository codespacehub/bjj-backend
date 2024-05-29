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
import { endOfWeek, format, startOfWeek } from 'date-fns';

@Injectable()
export class CreatePresenceService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: PrismaUserRepository,
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
  ) { }

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

    const getPresencesUser = await this.presenceRepository.findByUserId(user_id)
    const weekStarted = startOfWeek(new Date(day))
    const weekEnd = endOfWeek(new Date(day))

    const filterPresencesByStartWeekAndEndWeek = getPresencesUser.filter(obj => {
      const dateCreate = obj.created_at
      return dateCreate >= weekStarted && dateCreate <= weekEnd
    })

    console.log(filterPresencesByStartWeekAndEndWeek.length - findUser.Plan.class_limit)

    if (findUser.Plan.class_limit - filterPresencesByStartWeekAndEndWeek.length > 0) {
      const getPresences = await this.presenceRepository.findAll(user.organization)
      const formatCurrentDate = format(new Date(day), 'dd/MM/yyyy')
      const userPresences = getPresences.filter(presence => {
        const formatDateInvoice = format(presence.day, 'dd/MM/yyyy')
        if (
          presence.user_id === user_id
          && formatCurrentDate === formatDateInvoice
          && time_id === presence.time_id
        ) {
          return presence
        }
      })

      if (userPresences.length <= 0) {
        const newPresence = new Presence({
          day,
          time_id,
          user_id,
          modality_id,
          confirmation,
          organization_id: org,
        });

        const presence = await this.presenceRepository.create(newPresence);
        const updateAmountClass = await this.userRepository.updateAmountClass(user_id);

        return {
          presence,
          updateAmountClass,
        };
      } else {
        throw new BadRequestException("Você já tem uma presença nesta aula.")
      }
    } else {
      throw new BadRequestException("Você já atingiu a quantidade de presenças da semana.")
    }
  }
}
