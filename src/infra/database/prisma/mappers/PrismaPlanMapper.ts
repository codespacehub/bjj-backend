import { Plan } from '@/application/entities/plan';

export class PrismaPlanMapper {
  static toPrisma(plan: Plan) {
    return {
      id: plan.id,
      name: plan.name,
      value: plan.value,
      description: plan.description,
      organization_id: plan.organization_id,
    };
  }
}
