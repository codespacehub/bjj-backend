import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CreateModalityDto } from './dto/CreateModalityDto';
import { CreateModalityService } from './services/create-modality.service';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { User } from '@/shared/decorators/user.decorator';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { FindAllModalitiesService } from './services/find-all-modalities.service';

@Controller('modality')
export class ModalityController {
  constructor(
    private readonly createModalityService: CreateModalityService,
    private readonly findAllModalitiesService: FindAllModalitiesService,
  ) {}

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createModality(
    @User() user: TLoggedUser,
    @Body() createModality: CreateModalityDto,
  ) {
    return this.createModalityService.execute(user, createModality);
  }

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    return this.findAllModalitiesService.execute(user);
  }
}
