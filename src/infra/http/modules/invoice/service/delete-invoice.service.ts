import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';

@Injectable()
export class DeleteInvoiceService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  execute(invoice_id: string) {
    const findInvoice = this.invoiceRepository.findById(invoice_id);

    if (!findInvoice) {
      throw new NotFoundException('Fatura informada não existe');
    }

    return this.invoiceRepository.delete(invoice_id);
  }
}
