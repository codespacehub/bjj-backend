import { Module } from '@nestjs/common';

import { PlanController } from './plan.controller';
import { CreatePlanService } from './services/create-plan.service';
import { RemovePlanService } from './services/remove-plan.service';
import { FindAllPlansService } from './services/find-all-plans.service';
import { FindPlanByIdService } from './services/find-plan-by-id.service';
import { UpdatePlanService } from './services/update-plan.service';

@Module({
  controllers: [PlanController],
  providers: [
    CreatePlanService,
    UpdatePlanService,
    RemovePlanService,
    FindAllPlansService,
    FindPlanByIdService,
  ],
})
export class PlanModule {}
