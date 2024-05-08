import { Injectable, Inject } from '@nestjs/common';
import { InvoiceOrganization } from '@/application/entities/invoice-organization';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';

@Injectable()
export class CreateInvoicesForCronOrganizationService {
  constructor(
    @Inject('IInvoiceOrganizationRepository')
    private readonly invoiceOrganizationRepository: IInvoiceOrganizationRepository,
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute() {
    const getOrganizations: any = await this.organizationRepository.findAll();

    for (let organization of getOrganizations) {
      if(organization.active && organization.payment_value !== 0) {
        const invoiceOrganization = new InvoiceOrganization({
          value: organization.payment_value,
          paidDay: '0',
          organization_id: organization.id,
          paidOut: false,
        });
        await this.invoiceOrganizationRepository.create(invoiceOrganization);
      }
    }
  }
}
