import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { CreatePlanService } from './services/create-plan.service';
import { RemovePlanService } from './services/remove-plan.service';
import { FindAllPlansService } from './services/find-all-plans.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@/shared/decorators/user.decorator';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

@ApiTags('Plano')
@Controller({ version: '1', path: 'plans' })
export class PlanController {
  constructor(
    private readonly createPlanService: CreatePlanService,
    private readonly removePlanService: RemovePlanService,
    private readonly findAllPlansService: FindAllPlansService,
  ) {}

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAllPlans(@User() user: TLoggedUser) {
    return this.findAllPlansService.execute(user.organization);
  }

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createPlan(@User() user: TLoggedUser, @Body() createPlanDto: any) {
    return this.createPlanService.execute(createPlanDto, user.organization);
  }

  @Delete(':planId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  removePlan(@Param('planId') planId: string) {
    return this.removePlanService.execute(planId);
  }
}
