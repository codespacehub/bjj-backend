import { Time } from '../../../../../application/entities/time';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { ITimeRepository } from '@/application/repositories/time.repository';
import { CreateTimeDto } from '../dtos/create-or-update-time.dto';

@Injectable()
export class CreateTimeService {
  constructor(
    @Inject('ITimeRepository')
    private readonly timeRepository: ITimeRepository,
  ) { }

  async execute(timeDto: CreateTimeDto, user: TLoggedUser) {
    const org = user.organization;

    const { hour, modality } = timeDto;

    const allTimes = await this.timeRepository.findAll(org)

    for (let time of allTimes) {
      if (time.hour === hour && time.modality_id === modality) {
        throw new BadRequestException("Já existe o mesmo horário criado para esta modalidade")
      } else {
        const time = new Time({
          hour,
          modality,
          organization: org,
        });
        return this.timeRepository.create(time);
      }
    }
  }
}
