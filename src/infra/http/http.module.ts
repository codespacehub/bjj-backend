import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

import { AuthModule } from './modules/auth/auth.module';
import { ModalityModule } from './modules/modality/modality.module';
import { GraduationModule } from './modules/graduation/graduation.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ModalityModule,
    GraduationModule,
    OrganizationModule,
  ],
})
export class HttpModule {}
