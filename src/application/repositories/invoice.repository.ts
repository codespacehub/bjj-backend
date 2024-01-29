import { Invoice } from '../entities/invoice';

export interface IInvoiceRepository {
  delete(invoiceId: string): Promise<void>;
  create(invoice: Invoice): Promise<Invoice>;
  update(invoice_id: string): Promise<void>;
  findById(invoice_id: string): Promise<Invoice>;
  findAll(organization_id: string): Promise<Invoice[]>;
}
