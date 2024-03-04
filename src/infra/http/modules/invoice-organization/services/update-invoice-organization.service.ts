import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';
import { CreateAndUpdateInvoiceOrganizationDto } from '../dtos/create-and-update-invoice-organization.dto';

@Injectable()
export class UpdateInvoiceOrganizationService {
  constructor(
    @Inject('IInvoiceOrganizationRepository')
    private readonly invoicesOrganizationRepository: IInvoiceOrganizationRepository,
  ) {}

  async execute(invoice_id: string, invoiceDto: CreateAndUpdateInvoiceOrganizationDto) {
    const findInvoice = await this.invoicesOrganizationRepository.findById(invoice_id);

    if (!findInvoice) {
      throw new NotFoundException('Organização informada não existe');
    }

    return this.invoicesOrganizationRepository.updateInvoiceOrganization(invoice_id, invoiceDto);
  }
}
