import { Inject, Injectable } from '@nestjs/common';
import { IPlanRepository } from '@/application/repositories/plan.repository';
import { Plan } from '@/application/entities/plan';
import { CreateAndUpdatePlanDto } from './dtos/create-and-update-plan.dto';

@Injectable()
export class CreatePlanService {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(
    createPlanDto: CreateAndUpdatePlanDto,
    organization_id: string,
  ) {
    const plan = new Plan({
      organization_id,
      name: createPlanDto.name,
      value: createPlanDto.value,
      limit: createPlanDto.limit,
      description: createPlanDto.description,
    });

    return await this.planRepository.create(plan);
  }
}
