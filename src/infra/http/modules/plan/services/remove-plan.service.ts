import { Inject, Injectable } from '@nestjs/common';
import { IPlanRepository } from '@/application/repositories/plan.repository';

@Injectable()
export class RemovePlanService {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(planId: string) {
    return await this.planRepository.remove(planId);
  }
}
