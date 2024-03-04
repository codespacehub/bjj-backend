import { getMonth, getYear } from 'date-fns';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

Injectable();
export class CalculationInvoiceOrganizationsService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute() {
    const getOrganizations: any =
      await this.organizationRepository.findAll();

    let invoices = [];

    

    for (let organization of getOrganizations) {
      if (organization.active) {
          organization.InvoiceOrganization.filter((invoice: any) => {
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

    
    const calculate = invoices.reduce((soma, numero) => soma + numero, 0)
    
    return calculate;
  }
}
