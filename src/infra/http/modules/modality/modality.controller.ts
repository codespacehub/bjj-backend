import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { User } from '@/shared/decorators/user.decorator';
import { UpdateModalityService } from './services/update-modality.service';
import { RemoveModalityService } from './services/remove-modality.service';
import { CreateModalityService } from './services/create-modality.service';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { CreateOrUpdateModalityDto } from './dto/create-or-update-modality.dto';
import { FindAllModalitiesService } from './services/find-all-modalities.service';
import { FindModalityByIdService } from './services/find-modality-by-id.service';

@ApiTags('Modalidade')
@Controller({ version: '1', path: 'modalities' })
export class ModalityController {
  constructor(
    private readonly createModalityService: CreateModalityService,
    private readonly removeModalityService: RemoveModalityService,
    private readonly updateModalityService: UpdateModalityService,
    private readonly findModalityByIdService: FindModalityByIdService,
    private readonly findAllModalitiesService: FindAllModalitiesService,
  ) {}

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    return this.findAllModalitiesService.execute(user);
  }

  @Get(':modalityId')
  findModalityById(@Param('modalityId') modalityId: string) {
    return this.findModalityByIdService.execute(modalityId);
  }

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createModality(
    @User() user: TLoggedUser,
    @Body() createModalityDto: CreateOrUpdateModalityDto,
  ) {
    return this.createModalityService.execute(user, createModalityDto);
  }

  @Patch()
  updateModality(
    @User() user: TLoggedUser,
    @Body() updateModalityDto: CreateOrUpdateModalityDto,
  ) {
    return this.updateModalityService.execute(user, updateModalityDto);
  }

  @Delete(':modalityId')
  removeModality(@Param('modalityId') modalityId: string) {
    return this.removeModalityService.execute(modalityId);
  }
}
