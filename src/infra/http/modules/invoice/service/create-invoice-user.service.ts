import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';

import { Invoice } from '@/application/entities/invoice';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IUserRepository } from '@/application/repositories/user.repository';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';

@Injectable()
export class CreateInvoiceUserService {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(user_id: string) {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const findUser = await this.userRepository.findById(user_id)

    if (!findUser) {
      throw new NotFoundException("Este usuário não existe em nosso sistema.")
    }

    // Verificar se o usuário já tem uma fatura para o mês atual
    const hasInvoiceThisMonth = findUser.Invoices.some(invoice => {
      const invoiceDate = new Date(invoice.created_at);
      return invoiceDate.getMonth() + 1 === currentMonth &&
        invoiceDate.getFullYear() === currentYear;
    });

    if (hasInvoiceThisMonth) {
      throw new BadRequestException("Este usuário já tem uma mensalidade ativa este mês")
    }

    // Se não houver uma fatura para este usuário neste mês, criar uma nova
    if (!hasInvoiceThisMonth) {
      const invoice = await new Invoice({
        user_id,
        paidDay: '0',
        paidOut: false,
        value: findUser.Plan.value,
        organization_id: findUser.organization_id,
      })

      return await this.invoiceRepository.create(invoice)
    }
  }
}

