import { Module } from '@nestjs/common';

import { TimeController } from './time.controller';
import { CreateTimeService } from './services/create-time.service';
import { DeleteTimeService } from './services/delete-time.service';
import { FindAllTimeService } from './services/find-all-times.service';

@Module({
  controllers: [TimeController],
  providers: [CreateTimeService, FindAllTimeService, DeleteTimeService],
})
export class TimeModule {}
