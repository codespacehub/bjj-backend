import { Module } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from './infra/http/http.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';

import config from './config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env', '.env.dev'],
    }),
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
    SharedModule,
    DatabaseModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
