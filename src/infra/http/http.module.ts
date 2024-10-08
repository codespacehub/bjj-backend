import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

import { AuthModule } from './modules/auth/auth.module';
import { PlanModule } from './modules/plan/plan.module';
import { TimeModule } from './modules/time/time.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PresenceModule } from './modules/presence/presence.module';
import { ModalityModule } from './modules/modality/modality.module';
import { GraduationModule } from './modules/graduation/graduation.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { InvoiceOrganizationModule } from './modules/invoice-organization/invoice-organization.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PlanModule,
    TimeModule,
    InvoiceModule,
    ModalityModule,
    PresenceModule,
    GraduationModule,
    OrganizationModule,
    InvoiceOrganizationModule,
  ],
})
export class HttpModule {}
