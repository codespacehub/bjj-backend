import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

import { OrganizationController } from './modules/organization/organization.controller';
import { ModalityController } from './modules/modality/modality.controller';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { ModalityModule } from './modules/modality/modality.module';

@Module({
  imports: [UserModule, OrganizationModule, ModalityModule, AuthModule],
})
export class HttpModule {}
