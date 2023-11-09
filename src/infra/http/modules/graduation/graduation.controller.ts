import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateGraduationService } from './service/create-graduation.service';
import { CreateAndUpdateGraduationDto } from './dto/create-and-update-graduation';
import { UpdateGraduationService } from './service/update-graduation.service';
import { FindAllGraduationService } from './service/find-all-graduation.service';
import { FindGraduationByIdService } from './service/find-by-id-graduation.service';
import { DeleteGraduationService } from './service/delete-graduation.service';

@Controller('graduation')
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
