import { Module } from '@nestjs/common';
import { ModalityController } from './modality.controller';
import { CreateModalityService } from './services/create-modality.service';

@Module({
  controllers: [ModalityController],
  providers: [CreateModalityService],
})
export class ModalityModule {}
