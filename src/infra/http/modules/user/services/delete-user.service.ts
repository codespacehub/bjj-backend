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
    console.time("delete-user")
    const findUser: any = await this.userRepository.findById(userId);

    if (!findUser) {
      throw new NotFoundException('Usuário informado não existe');
    }
    
    const presenceDeletions = findUser.Presence.map(presence => this.presenceRepository.delete(presence.id));
    const timeDeletions = findUser.times.map(time => this.timeRepository.remove(time.id));
    const invoiceDeletions = findUser.Invoices.map(invoice => this.invoiceRepository.delete(invoice.id));

    await Promise.all([...presenceDeletions, ...timeDeletions, ...invoiceDeletions]);

    console.timeEnd("delete-user")
    return await this.userRepository.remove(userId);
  }
}
