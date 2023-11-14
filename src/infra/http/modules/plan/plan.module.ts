import { Module } from '@nestjs/common';

import { PlanController } from './plan.controller';
import { CreatePlanService } from './services/create-plan.service';
import { RemovePlanService } from './services/remove-plan.service';
import { FindAllPlansService } from './services/find-all-plans.service';

@Module({
  controllers: [PlanController],
  providers: [CreatePlanService, FindAllPlansService, RemovePlanService],
})
export class PlanModule {}
