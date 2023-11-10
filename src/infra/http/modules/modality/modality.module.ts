import { Module } from '@nestjs/common';

import { ModalityController } from './modality.controller';
import { CreateModalityService } from './services/create-modality.service';
import { RemoveModalityService } from './services/remove-modality.service';
import { UpdateModalityService } from './services/update-modality.service';
import { FindModalityByIdService } from './services/find-modality-by-id.service';
import { FindAllModalitiesService } from './services/find-all-modalities.service';

@Module({
  controllers: [ModalityController],
  providers: [
    CreateModalityService,
    FindAllModalitiesService,
    RemoveModalityService,
    UpdateModalityService,
    FindModalityByIdService,
  ],
})
export class ModalityModule {}
