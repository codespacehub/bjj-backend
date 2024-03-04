import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdatePaidOutService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoicesRepository: IInvoiceRepository,
  ) {}

  async execute(invoice_id: string) {
    const findInvoice = await this.invoicesRepository.findById(invoice_id);

    if (!findInvoice) {
      throw new NotFoundException('Organização informada não existe');
    }

    return this.invoicesRepository.updatePaidOut(invoice_id);
  }
}
