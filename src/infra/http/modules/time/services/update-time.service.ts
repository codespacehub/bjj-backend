import { CreateTimeDto } from '../dtos/create-or-update-time.dto';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITimeRepository } from '@/application/repositories/time.repository';

@Injectable()
export class UpdateTimeService {
  constructor(
    @Inject('ITimeRepository')
    private readonly timeRepository: ITimeRepository,
  ) {}

  execute(timeId: string, timeDto: CreateTimeDto) {
    const findTime = this.timeRepository.findById(timeId);

    if (!findTime) {
      throw new NotFoundException('Esse horário não existe, tente novamente.');
    }

    console.log(timeDto);
    return this.timeRepository.update(timeId, timeDto);
  }
}
