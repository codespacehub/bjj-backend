import { IPlanRepository } from '@/application/repositories/plan.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllPlansService {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(organization_id: string) {
    return await this.planRepository.findAll(organization_id);
  }
}
