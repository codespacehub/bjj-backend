import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAndUpdateInvoiceDto } from '../dtos/create-and-update-invoice.dto';

@Injectable()
export class UpdateInvoiceService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoicesRepository: IInvoiceRepository,
  ) {}

  async execute(invoice_id: string, invoiceDto: CreateAndUpdateInvoiceDto) {
    const findInvoice = await this.invoicesRepository.findById(invoice_id);

    if (!findInvoice) {
      throw new NotFoundException('Organização informada não existe');
    }

    return this.invoicesRepository.updateInvoice(invoice_id, invoiceDto);
  }
}
