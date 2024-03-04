import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { CreateInvoiceUsersService } from './service/create-invoice-users.service';
import { DeleteInvoiceService } from './service/delete-invoice.service';
import { FindAllInvoicesService } from './service/find-all-invoice.service';
import { FindInvoicesByIdService } from './service/find-invoice-by-id.service';
import { UpdatePaidOutService } from './service/update-paid-out.service';
import { UpdateInvoiceService } from './service/update-invoice.service';

@Module({
  controllers: [InvoiceController],
  providers: [
    UpdatePaidOutService,
    UpdateInvoiceService,
    DeleteInvoiceService,
    FindAllInvoicesService,
    FindInvoicesByIdService,
    CreateInvoiceUsersService,
  ],
})
export class InvoiceModule {}
