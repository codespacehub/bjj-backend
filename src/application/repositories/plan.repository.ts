import { Plan } from '../entities/plan';
import { CreateAndUpdatePlanDto } from '@/infra/http/modules/plan/services/dtos/create-and-update-plan.dto';

export interface IPlanRepository {
  remove(planId: string): Promise<Plan>;
  findById(planId: string): Promise<Plan>;
  create(createPlanDto: Plan): Promise<Plan>;
  findAll(organization: string): Promise<Plan>;
  update(planId: string, planDto: CreateAndUpdatePlanDto): Promise<Plan>;
}
