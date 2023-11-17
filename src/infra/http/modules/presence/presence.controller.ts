import { ApiSecurity } from '@nestjs/swagger';
import { User } from '@/shared/decorators/user.decorator';
import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { CreatePresenceDto } from './dtos/create-presence.dto';
import { CreatePresenceService } from './services/create-presence.service';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { FindByDatePresenceService } from './services/find-by-date-presence.service';
import { FindAllPresenciesService } from './services/find-all-presencies.service';

@Controller({ version: '1', path: 'presences' })
export class PresenceController {
  constructor(
    private readonly createPresenceService: CreatePresenceService,
    private readonly findAllPresenciesService: FindAllPresenciesService,
    private readonly findByDatePresenceService: FindByDatePresenceService,
  ) {}

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createPresence(
    @Body() presenceDto: CreatePresenceDto,
    @User() user: TLoggedUser,
  ) {
    return this.createPresenceService.execute(user, presenceDto);
  }

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    return this.findAllPresenciesService.execute(user);
  }

  @Get(':date')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findByDate(@Param('date') date: string, @User() user: TLoggedUser) {
    return this.findByDatePresenceService.execute(user, date);
  }
}
