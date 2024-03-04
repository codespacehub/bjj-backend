import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrganizationController } from './organization.controller';

import { CreateAdminService } from '../user/services/create-admin.service';
import { CreateOrganizationService } from './services/create-organization.service';
import { UpdateOrganizationService } from './services/update-organization.service';
import { DeleteOrganizationService } from './services/delete-organization.service';
import { FindAllOrganizationService } from './services/find-all-organization.service';
import { UpdateActiveByIdService } from './services/update-active-organization.service';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';
import { CalculationInvoiceUsersService } from './services/calculation-invoice-users.service';
import { CalculationInvoiceOrganizationsService } from './services/calculation-invoice-organizations.service';

@Module({
  imports: [HttpModule],
  controllers: [OrganizationController],
  providers: [
    CreateAdminService,
    UpdateActiveByIdService,
    CreateOrganizationService,
    UpdateOrganizationService,
    DeleteOrganizationService,
    FindAllOrganizationService,
    FindOrganizationByIdService,
    CalculationInvoiceUsersService,
    CalculationInvoiceOrganizationsService,
  ],
})
export class OrganizationModule {}
