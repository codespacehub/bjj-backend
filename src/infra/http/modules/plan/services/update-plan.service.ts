import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateAndUpdatePlanDto } from './dtos/create-and-update-plan.dto';
import { IPlanRepository } from '@/application/repositories/plan.repository';

@Injectable()
export class UpdatePlanService {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
  ) {}

  execute(planId: string, planDto: CreateAndUpdatePlanDto) {
    const plan = this.planRepository.findById(planId);

    if (!plan) {
      throw new NotFoundException('🥲 Esse Plano não existe, tente novamente');
    }

    return this.planRepository.update(planId, planDto);
  }
}
