import { InvoiceOrganization } from '@/application/entities/invoice-organization';

export class PrismaInvoiceOrganizationMapper {
  static toPrisma(invoiceOrganization: InvoiceOrganization) {
    return {
      id: invoiceOrganization.id,
      value: invoiceOrganization.value,
      paidDay: invoiceOrganization.paidDay,
      paidOut: invoiceOrganization.paidOut,
      organization_id: invoiceOrganization.organization_id,
    };
  }
}
