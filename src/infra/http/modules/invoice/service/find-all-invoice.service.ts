import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllInvoicesService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoicesRepository: IInvoiceRepository,
  ) {}

  execute(user: TLoggedUser) {
    const organization_id = user.organization;

    return this.invoicesRepository.findAll(organization_id);
  }
}
