import { Module } from '@nestjs/common';
import { PresenceController } from './presence.controller';
import { CreatePresenceService } from './services/create-presence.service';
import { FindByDatePresenceService } from './services/find-by-date-presence.service';
import { FindAllPresenciesService } from './services/find-all-presencies.service';
import { DeletePresenceService } from './services/delete-presence.service';

@Module({
  controllers: [PresenceController],
  providers: [
    CreatePresenceService,
    DeletePresenceService,
    FindAllPresenciesService,
    FindByDatePresenceService,
  ],
})
export class PresenceModule {}
