import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { CreateInvoiceUsersForCronService } from './service/create-invoices-users-for-cron.service';
import { DeleteInvoiceService } from './service/delete-invoice.service';
import { FindAllInvoicesService } from './service/find-all-invoice.service';
import { FindInvoicesByIdService } from './service/find-invoice-by-id.service';
import { UpdatePaidOutService } from './service/update-paid-out.service';
import { UpdateInvoiceService } from './service/update-invoice.service';
import { CreateInvoiceUserService } from './service/create-invoice-user.service';

@Module({
  controllers: [InvoiceController],
  providers: [
    UpdatePaidOutService,
    UpdateInvoiceService,
    DeleteInvoiceService,
    FindAllInvoicesService,
    FindInvoicesByIdService,
    CreateInvoiceUserService,
    CreateInvoiceUsersForCronService,
  ],
})
export class InvoiceModule {}
