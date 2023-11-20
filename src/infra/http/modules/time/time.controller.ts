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

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { User } from '@/shared/decorators/user.decorator';
import { CreateTimeDto } from './dtos/create-or-update-time.dto';
import { CreateTimeService } from './services/create-time.service';
import { DeleteTimeService } from './services/delete-time.service';
import { FindAllTimeService } from './services/find-all-times.service';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { FindTimeByIdService } from './services/find-time-by-id.service';
import { UpdateTimeService } from './services/update-time.service';

@ApiTags('Horários')
@Controller({ version: '1', path: 'times' })
export class TimeController {
  constructor(
    private readonly createTimeService: CreateTimeService,
    private readonly updateTimeService: UpdateTimeService,
    private readonly deleteTimeService: DeleteTimeService,
    private readonly findAllTimeService: FindAllTimeService,
    private readonly findTimeByIdService: FindTimeByIdService,
  ) {}

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createTime(@Body() timeDto: CreateTimeDto, @User() user: TLoggedUser) {
    return this.createTimeService.execute(timeDto, user);
  }

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    return this.findAllTimeService.execute(user.organization);
  }

  @Get(':timeId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findById(@Param('timeId') timeId: string) {
    return this.findTimeByIdService.execute(timeId);
  }

  @Patch(':timeId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  update(@Param('timeId') timeId: string, @Body() timeDto: CreateTimeDto) {
    return this.updateTimeService.execute(timeId, timeDto);
  }

  @Delete(':idTime')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  delete(@Param('idTime') idTime: string) {
    return this.deleteTimeService.execute(idTime);
  }
}
