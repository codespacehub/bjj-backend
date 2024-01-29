import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindInvoicesByIdService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoicesRepository: IInvoiceRepository,
  ) {}

  execute(invoice_id: string) {
    return this.invoicesRepository.findById(invoice_id);
  }
}
