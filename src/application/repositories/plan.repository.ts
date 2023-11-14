import { Plan } from '../entities/plan';

export interface IPlanRepository {
  remove(planId: string): Promise<any>;
  findById(planId: string): Promise<any>;
  create(createPlanDto: Plan): Promise<any>;
  findAll(organization: string): Promise<any>;
}
