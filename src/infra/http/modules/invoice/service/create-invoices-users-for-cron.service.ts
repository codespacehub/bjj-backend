import { Injectable, Inject } from '@nestjs/common';
import { Invoice } from '@/application/entities/invoice';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

@Injectable()
export class CreateInvoiceUsersForCronService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const getOrganizations: any = await this.organizationRepository.findAll();

    for (let organization of getOrganizations) {
      for (let user of organization.users) {
        if (user.role === 'Aluno' && user.active) {
          // Verificar se o usuário já tem uma fatura para o mês atual
          const hasInvoiceThisMonth = user.Invoices.some(invoice => {
            const invoiceDate = new Date(invoice.created_at);
            return invoiceDate.getMonth() + 1 === currentMonth &&
              invoiceDate.getFullYear() === currentYear;
          });

          // Se não houver uma fatura para este usuário neste mês, criar uma nova
          if (!hasInvoiceThisMonth) {
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
}
