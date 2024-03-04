import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';

@Injectable()
export class FindInvoicesOrganizationByIdService {
  constructor(
    @Inject('IInvoiceOrganizationRepository')
    private readonly invoicesOrganizationRepository: IInvoiceOrganizationRepository,
  ) {}

  async execute(invoiceOrganization_id: string) {
    const findInvoiceOrganization = await this.invoicesOrganizationRepository.findById(invoiceOrganization_id);

    if(!findInvoiceOrganization) {
      throw new NotFoundException('Esta fatura não existe')
    }

    return findInvoiceOrganization
  }
}
