import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InvoiceOrganization } from '@/application/entities/invoice-organization';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';

@Injectable()
export class CreateInvoiceOrganizationService {
  constructor(
    @Inject('IInvoiceOrganizationRepository')
    private readonly invoiceOrganizationRepository: IInvoiceOrganizationRepository,
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) { }

  async execute(organization_id: string) {
    const findOrganization = await this.organizationRepository.findById(organization_id)

    if (!findOrganization) {
      throw new NotFoundException("🤯 Esta organização não existe")
    }

    const invoiceOrganization = new InvoiceOrganization({
      value: findOrganization.payment_value,
      paidDay: '0',
      organization_id: findOrganization.id,
      paidOut: false,
    });
    
    return await this.invoiceOrganizationRepository.create(invoiceOrganization);
  }
}