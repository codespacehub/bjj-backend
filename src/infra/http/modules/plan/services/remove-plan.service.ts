import {
  Inject,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { IPlanRepository } from '@/application/repositories/plan.repository';

@Injectable()
export class RemovePlanService {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(planId: string) {
    const findPlan: any = await this.planRepository.findById(planId);

    if (!findPlan) {
      throw new NotFoundException('Plano informado não existe');
    }

    if (findPlan.users.length > 0) {
      throw new ConflictException('Existem usuários conectados a esse plano');
    }

    return await this.planRepository.remove(planId);
  }
}
