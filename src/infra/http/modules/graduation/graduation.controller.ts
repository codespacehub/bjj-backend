import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateGraduationService } from './service/create-graduation.service';
import { UpdateGraduationService } from './service/update-graduation.service';
import { DeleteGraduationService } from './service/delete-graduation.service';
import { FindAllGraduationService } from './service/find-all-graduation.service';
import { CreateAndUpdateGraduationDto } from './dto/create-and-update-graduation';
import { FindGraduationByIdService } from './service/find-by-id-graduation.service';

@ApiTags('Graduações')
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
  create(@Body() graduation: CreateAndUpdateGraduationDto) {
    return this.createGraduationService.execute(graduation);
  }

  @Patch(':idGraduation')
  update(
    @Body() newGraduation: CreateAndUpdateGraduationDto,
    @Param('idGraduation') idGraduation: string,
  ) {
    return this.updateGraduationService.execute(newGraduation, idGraduation);
  }

  @Get(':idGraduation')
  async findById(@Param('idGraduation') idGraduation: string) {
    return await this.findGraduationByIdService.execute(idGraduation);
  }

  @Get()
  findAll() {
    return this.findAllGraduationService.execute();
  }

  @Delete(':idGraduation')
  delete(@Param('idGraduation') idGraduation: string) {
    return this.deleteGraduationService.execute(idGraduation);
  }
}
