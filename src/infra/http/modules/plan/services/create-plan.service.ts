import { Inject, Injectable } from '@nestjs/common';
import { IPlanRepository } from '@/application/repositories/plan.repository';
import { Plan } from '@/application/entities/plan';

@Injectable()
export class CreatePlanService {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(createPlanDto: any, organization_id: string) {
    const plan = new Plan({
      organization_id,
      name: createPlanDto.name,
      value: createPlanDto.value,
      description: createPlanDto.description,
    });

    return await this.planRepository.create(plan);
  }
}
