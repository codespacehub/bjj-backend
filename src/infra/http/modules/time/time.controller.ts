import {
  Get,
  Body,
  Post,
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

@ApiTags('Horários')
@Controller({ version: '1', path: 'times' })
export class TimeController {
  constructor(
    private readonly createTimeService: CreateTimeService,
    private readonly deleteTimeService: DeleteTimeService,
    private readonly findAllTimeService: FindAllTimeService,
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

  @Delete(':idTime')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  delete(@Param('idTime') idTime: string) {
    return this.deleteTimeService.execute(idTime);
  }
}
