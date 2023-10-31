import { Module } from '@nestjs/common';
import { ModalityController } from './modality.controller';
import { CreateModalityService } from './services/create-modality.service';
import { FindAllModalitiesService } from './services/find-all-modalities.service';

@Module({
  controllers: [ModalityController],
  providers: [CreateModalityService, FindAllModalitiesService],
})
export class ModalityModule {}
