import { Module } from '@nestjs/common';

import { TimeController } from './time.controller';
import { CreateTimeService } from './services/create-time.service';
import { DeleteTimeService } from './services/delete-time.service';
import { FindAllTimeService } from './services/find-all-times.service';
import { FindTimeByIdService } from './services/find-time-by-id.service';
import { UpdateTimeService } from './services/update-time.service';

@Module({
  controllers: [TimeController],
  providers: [
    CreateTimeService,
    UpdateTimeService,
    DeleteTimeService,
    FindAllTimeService,
    FindTimeByIdService,
  ],
})
export class TimeModule {}
