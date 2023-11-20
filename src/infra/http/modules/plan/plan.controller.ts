import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { CreatePlanService } from './services/create-plan.service';
import { RemovePlanService } from './services/remove-plan.service';
import { FindAllPlansService } from './services/find-all-plans.service';
import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { User } from '@/shared/decorators/user.decorator';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { FindPlanByIdService } from './services/find-plan-by-id.service';
import { CreateAndUpdatePlanDto } from './services/dtos/create-and-update-plan.dto';
import { UpdatePlanService } from './services/update-plan.service';

@ApiTags('Plano')
@Controller({ version: '1', path: 'plans' })
export class PlanController {
  constructor(
    private readonly createPlanService: CreatePlanService,
    private readonly updatePlanService: UpdatePlanService,
    private readonly removePlanService: RemovePlanService,
    private readonly findPlanByIdService: FindPlanByIdService,
    private readonly findAllPlansService: FindAllPlansService,
  ) {}

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAllPlans(@User() user: TLoggedUser) {
    return this.findAllPlansService.execute(user.organization);
  }

  @Get(':planId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findById(@Param('planId') planId: string) {
    return this.findPlanByIdService.execute(planId);
  }

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createPlan(
    @User() user: TLoggedUser,
    @Body() createPlanDto: CreateAndUpdatePlanDto,
  ) {
    return this.createPlanService.execute(createPlanDto, user.organization);
  }

  @Patch(':planId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  updatePlan(
    @Param('planId') planId: string,
    @Body() planDto: CreateAndUpdatePlanDto,
  ) {
    return this.updatePlanService.execute(planId, planDto);
  }

  @Delete(':planId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  removePlan(@Param('planId') planId: string) {
    return this.removePlanService.execute(planId);
  }
}
