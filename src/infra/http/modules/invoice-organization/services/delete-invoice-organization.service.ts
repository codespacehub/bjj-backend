import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';

@Injectable()
export class DeleteInvoiceOrganizationService {
  constructor(
    @Inject('IInvoiceOrganizationRepository')
    private readonly invoiceOrganizationRepository: IInvoiceOrganizationRepository,
  ) {}

  execute(invoiceOrganization_id: string) {
    const findInvoiceOrganization = this.invoiceOrganizationRepository.findById(invoiceOrganization_id);

    if (!findInvoiceOrganization) {
      throw new NotFoundException('Fatura informada não existe');
    }

    return this.invoiceOrganizationRepository.delete(invoiceOrganization_id);
  }
}
