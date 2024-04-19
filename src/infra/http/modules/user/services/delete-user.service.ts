import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { IUserRepository } from '@/application/repositories/user.repository';
import { IPresenceRepository } from '@/application/repositories/presence.repository';
import { ITimeRepository } from '@/application/repositories/time.repository';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPresenceRepository')
    private readonly presenceRepository: IPresenceRepository,
    @Inject('ITimeRepository')
    private readonly timeRepository: ITimeRepository,
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(userId: string) {
    const findUser: any = await this.userRepository.findById(userId);

    if (!findUser) {
      throw new NotFoundException('Usuário informado não existe');
    }

    if (findUser.times.length > 0) {
      throw new ConflictException('Existem horários conectados a esse usuário');
    }

    if (findUser.Presence.length > 0) {
      for (let presence of findUser.Presence) {
        await this.presenceRepository.delete(presence.id);
      }
    }

    if (findUser.times.length > 0) {
      for (let time of findUser.times) {
        await this.timeRepository.remove(time.id);
      }
    }

    if (findUser.Invoices.length > 0) {
      for (let invoice of findUser.Invoices) {
        await this.invoiceRepository.delete(invoice.id);
      }
    }

    return await this.userRepository.remove(userId);
  }
}
