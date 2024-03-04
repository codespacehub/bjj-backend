import { getMonth, getYear } from 'date-fns';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

Injectable();
export class CalculationInvoiceUsersService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(organizationId: string) {
    const getOrganization: any =
      await this.organizationRepository.findById(organizationId);

    if (!getOrganization) {
      throw new NotFoundException(
        '🥲 Essa organização não existe, tente novamente',
      );
    }

    let invoices = [];

    

    for (let user of getOrganization.users) {
      if (user.active) {
        if (user.role === 'Aluno') {
          user.Invoices.filter((invoice: any) => {
            const currentDate = new Date();
            const currentMonth = getMonth(currentDate) + 1;
            const currentYear = getYear(currentDate);
            const invoiceMonth = getMonth(new Date(invoice.created_at)) + 1;
            const invoiceYear = getYear(new Date(invoice.created_at));
            if (currentMonth === invoiceMonth) {
              if (currentYear === invoiceYear) {
                const arrayValue = invoice.value;
                invoices.push(arrayValue)
              }
            }
          }); 
        }
      }
    }

    const calculate = invoices.reduce((soma, numero) => soma + numero, 0);
    return calculate;
  }
}
