import { Inject, Injectable } from '@nestjs/common';
import { ITimeRepository } from '@/application/repositories/time.repository';

@Injectable()
export class FindAllTimeService {
  constructor(
    @Inject('ITimeRepository')
    private readonly timeRepository: ITimeRepository,
  ) {}

  async execute(organization_id: string) {
    return await this.timeRepository.findAll(organization_id);
  }
}
