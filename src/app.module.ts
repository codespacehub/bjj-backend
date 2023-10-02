import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { SharedModule } from './shared/shared.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env', '.env.dev'],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
    SharedModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
