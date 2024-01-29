import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { CreateInvoiceService } from './service/create-invoice.service';
import { DeleteInvoiceService } from './service/delete-invoice.service';
import { FindAllInvoicesService } from './service/find-all-invoice.service';
import { FindInvoicesByIdService } from './service/find-invoice-by-id.service';
import { UpdatePaidOutService } from './service/update-paid-out.service';

@Module({
  controllers: [InvoiceController],
  providers: [
    UpdatePaidOutService,
    CreateInvoiceService,
    DeleteInvoiceService,
    FindAllInvoicesService,
    FindInvoicesByIdService,
  ],
})
export class InvoiceModule {}
