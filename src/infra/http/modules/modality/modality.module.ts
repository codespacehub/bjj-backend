import { Module } from '@nestjs/common';
import { ModalityController } from './modality.controller';

@Module({
  controllers: [ModalityController],
  providers: [],
})
export class ModalityModule {}
