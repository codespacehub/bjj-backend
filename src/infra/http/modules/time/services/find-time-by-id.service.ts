import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITimeRepository } from '@/application/repositories/time.repository';

@Injectable()
export class FindTimeByIdService {
  constructor(
    @Inject('ITimeRepository')
    private readonly timeRepository: ITimeRepository,
  ) {}

  execute(timeId: string) {
    const time = this.timeRepository.findById(timeId);

    if (!time) {
      throw new NotFoundException(
        '🥲 Essa horário não existe, tente novamente',
      );
    }

    return time;
  }
}
