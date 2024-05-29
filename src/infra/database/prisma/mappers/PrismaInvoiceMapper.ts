import { Invoice } from '@/application/entities/invoice';

export class PrismaInvoiceMapper {
  static toPrisma(invoice: Invoice) {
    return {
      id: invoice.id,
      value: invoice.value,
      paidDay: invoice.paidDay,
      paidOut: invoice.paidOut,
      user_id: String(invoice.user_id),
      organization_id: invoice.organization_id,
      created_at: invoice.created_at
    };
  }
}
