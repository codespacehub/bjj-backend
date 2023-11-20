import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IPlanRepository } from '@/application/repositories/plan.repository';

@Injectable()
export class FindPlanByIdService {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
  ) {}

  execute(planId: string) {
    const plan = this.planRepository.findById(planId);

    if (!plan) {
      throw new NotFoundException('🥲 Essa plano não existe, tente novamente');
    }

    return plan;
  }
}
