import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllInvoicesOrganizationService {
  constructor(
    @Inject('IInvoiceOrganizationRepository')
    private readonly invoicesOrganizationRepository: IInvoiceOrganizationRepository,
  ) {}

  execute() {
    return this.invoicesOrganizationRepository.findAll();
  }
}
