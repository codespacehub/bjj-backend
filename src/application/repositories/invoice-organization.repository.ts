import { CreateAndUpdateInvoiceOrganizationDto } from '@/infra/http/modules/invoice-organization/dtos/create-and-update-invoice-organization.dto';
import { InvoiceOrganization } from '../entities/invoice-organization';

export interface IInvoiceOrganizationRepository {
  delete(invoiceOrganizationId: string): Promise<void>;
  create(invoiceOrganizationDto: InvoiceOrganization): Promise<InvoiceOrganization>;
  findById(invoiceOrganization_id: string): Promise<InvoiceOrganization>;
  updatePaidOut(invoiceOrganization_id: string): Promise<void>;
  findAll(): Promise<InvoiceOrganization[]>;
  updateInvoiceOrganization(
    invoice_id: string,
    invoiceDto: CreateAndUpdateInvoiceOrganizationDto,
  ): Promise<void>;
}
