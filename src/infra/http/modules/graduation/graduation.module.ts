import { Module } from '@nestjs/common';
import { GraduationController } from './graduation.controller';
import { CreateGraduationService } from './service/create-graduation.service';
import { UpdateGraduationService } from './service/update-graduation.service';
import { DeleteGraduationService } from './service/delete-graduation.service';
import { FindAllGraduationService } from './service/find-all-graduation.service';
import { FindGraduationByIdService } from './service/find-by-id-graduation.service';

@Module({
  controllers: [GraduationController],
  providers: [
    CreateGraduationService,
    UpdateGraduationService,
    DeleteGraduationService,
    FindAllGraduationService,
    FindGraduationByIdService,
  ],
})
export class GraduationModule {}
