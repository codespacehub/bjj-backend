import { CreateAndUpdateInvoiceDto } from '@/infra/http/modules/invoice/dtos/create-and-update-invoice.dto';
import { Invoice } from '../entities/invoice';

export interface IInvoiceRepository {
  delete(invoiceId: string): Promise<void>;
  create(invoice: Invoice): Promise<Invoice>;
  findById(invoice_id: string): Promise<Invoice>;
  updatePaidOut(invoice_id: string): Promise<void>;
  findAll(organization_id: string): Promise<Invoice[]>;
  updateInvoice(
    invoice_id: string,
    invoiceDto: CreateAndUpdateInvoiceDto,
  ): Promise<void>;
}
