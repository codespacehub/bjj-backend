import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';

@Injectable()
export class UpdatePaidOutInvoiceOrganizationService {
  constructor(
    @Inject('IInvoiceOrganizationRepository')
    private readonly invoicesOrganizationRepository: IInvoiceOrganizationRepository,
  ) {}

  async execute(invoice_id: string) {
    const findInvoiceOrganization = await this.invoicesOrganizationRepository.findById(invoice_id);

    if (!findInvoiceOrganization) {
      throw new NotFoundException('Organização informada não existe');
    }

    return this.invoicesOrganizationRepository.updatePaidOut(invoice_id);
  }
}
