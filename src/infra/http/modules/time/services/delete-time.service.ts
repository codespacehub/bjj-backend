import { Inject, Injectable } from '@nestjs/common';
import { ITimeRepository } from '@/application/repositories/time.repository';

@Injectable()
export class DeleteTimeService {
  constructor(
    @Inject('ITimeRepository')
    private readonly timeRepository: ITimeRepository,
  ) {}

  execute(idTime: string) {
    return this.timeRepository.remove(idTime);
  }
}
