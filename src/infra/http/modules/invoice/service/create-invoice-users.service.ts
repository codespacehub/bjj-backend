import { Injectable, Inject } from '@nestjs/common';
import { Invoice } from '@/application/entities/invoice';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

@Injectable()
export class CreateInvoiceUsersService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute() {
    const getOrganizations: any = await this.organizationRepository.findAll();

    for (let organization of getOrganizations) {
      for (let user of organization.users) {
        if (user.role === 'Aluno') {  
          const invoice = new Invoice({
            value: user.Plan.value,
            paidDay: '0',
            user_id: user.id,
            organization_id: user.organization_id,
            paidOut: false,
          });
          await this.invoiceRepository.create(invoice);
        }
      } 
    }
  }
}
