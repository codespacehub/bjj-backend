import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { User } from '@/shared/decorators/user.decorator';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { CreateGraduationService } from './service/create-graduation.service';
import { UpdateGraduationService } from './service/update-graduation.service';
import { DeleteGraduationService } from './service/delete-graduation.service';
import { FindAllGraduationService } from './service/find-all-graduation.service';
import { CreateAndUpdateGraduationDto } from './dto/create-and-update-graduation';
import { FindGraduationByIdService } from './service/find-by-id-graduation.service';

@ApiTags('Graduação')
@Controller({ version: '1', path: 'graduations' })
export class GraduationController {
  constructor(
    private readonly createGraduationService: CreateGraduationService,
    private readonly updateGraduationService: UpdateGraduationService,
    private readonly deleteGraduationService: DeleteGraduationService,
    private readonly findAllGraduationService: FindAllGraduationService,
    private readonly findGraduationByIdService: FindGraduationByIdService,
  ) {}

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  create(
    @User() user: TLoggedUser,
    @Body() graduation: CreateAndUpdateGraduationDto,
  ) {
    console.log(user);
    return this.createGraduationService.execute(graduation, user.organization);
  }

  @Patch(':graduationId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  update(
    @Body() newGraduation: CreateAndUpdateGraduationDto,
    @Param('graduationId') graduationId: string,
  ) {
    return this.updateGraduationService.execute(newGraduation, graduationId);
  }

  @Get(':graduationId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  async findById(@Param('graduationId') graduationId: string) {
    return await this.findGraduationByIdService.execute(graduationId);
  }

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    return this.findAllGraduationService.execute(user.organization);
  }

  @Delete(':graduationId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  delete(@Param('graduationId') graduationId: string) {
    return this.deleteGraduationService.execute(graduationId);
  }
}
