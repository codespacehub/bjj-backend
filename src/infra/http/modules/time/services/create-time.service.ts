import { Time } from '../../../../../application/entities/time';
import { Inject, Injectable } from '@nestjs/common';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { ITimeRepository } from '@/application/repositories/time.repository';
import { CreateTimeDto } from '../dtos/create-or-update-time.dto';

@Injectable()
export class CreateTimeService {
  constructor(
    @Inject('ITimeRepository')
    private readonly timeRepository: ITimeRepository,
  ) {}

  execute(timeDto: CreateTimeDto, user: TLoggedUser) {
    const ogr = user.organization;

    const { hour, modality } = timeDto;

    const time = new Time({
      hour,
      modality,
      organization: ogr,
    });
    return this.timeRepository.create(time);
  }
}
