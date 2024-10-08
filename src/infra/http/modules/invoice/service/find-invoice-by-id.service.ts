import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindInvoicesByIdService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoicesRepository: IInvoiceRepository,
  ) {}

  async execute(invoice_id: string) {
    const findInvoice = await this.invoicesRepository.findById(invoice_id);

    if(!findInvoice) {
      throw new NotFoundException("Esta fatura não existe")
    }

    return findInvoice
  }
}
