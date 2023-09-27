import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';

@Module({
  controllers: [TeacherController],
  providers: [],
})
export class TeacherModule {}
