import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 2000,
    }),
  ],
  providers: [PrismaService],
})
export class DatabaseModule {}
