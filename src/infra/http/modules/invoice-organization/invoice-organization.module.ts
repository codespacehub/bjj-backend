import { Module } from '@nestjs/common';
import { InvoiceOrganizationController } from './invoice-organization.controller';
import { DeleteInvoiceOrganizationService } from './services/delete-invoice-organization.service';
import { FindAllInvoicesOrganizationService } from './services/find-all-invoice-organization.service';
import { FindInvoicesOrganizationByIdService } from './services/find-invoice-organization-by-id.service';
import { UpdateInvoiceOrganizationService } from './services/update-invoice-organization.service';
import { UpdatePaidOutInvoiceOrganizationService } from './services/update-invoice-organization-paid-out.service';
import { CreateInvoicesForCronOrganizationService } from './services/create-invoice-for-cron-organization.service';

@Module({
  controllers: [InvoiceOrganizationController],
  providers: [
    DeleteInvoiceOrganizationService,
    UpdateInvoiceOrganizationService,
    FindAllInvoicesOrganizationService,
    FindInvoicesOrganizationByIdService,
    UpdatePaidOutInvoiceOrganizationService,
    CreateInvoicesForCronOrganizationService,
  ],
})
export class InvoiceOrganizationModule {}
