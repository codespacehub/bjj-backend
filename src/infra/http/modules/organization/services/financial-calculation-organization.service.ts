import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

Injectable();
export class FinancialCalculationService {
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
      if (user.active || user.role === 'Aluno') {
        const invoice = user.Plan;

        if (invoice) {
          const invoiceValue = invoice.value;
          invoices.push(invoiceValue);
        }
      }
    }

    const calculate = invoices.reduce((soma, numero) => soma + numero, 0);

    return calculate;
  }
}
