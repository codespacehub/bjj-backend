import { getDate, getMonth } from 'date-fns';
import { ConfigService } from '@nestjs/config';

import { Inject, Injectable } from '@nestjs/common';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { IUserRepository } from '@/application/repositories/user.repository';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';

@Injectable()
export class CheckPaydayUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
    @Inject('IMailer') private readonly mailer: IMailer,
    private readonly configService: ConfigService,
  ) {}

  async execute() {
    const getOrganizations: any = await this.organizationRepository.findAll();
    for (let organization of getOrganizations) {
      for (let user of organization.users) {
        if (user.role === 'Aluno') {
          const currentDate = new Date();
          const currentDay = getDate(currentDate);
          const currentMonth = getMonth(currentDate);

          const discountCurrentDateAndUserPayday = user.payday - currentDay;

          if (discountCurrentDateAndUserPayday === 1) {
            await this.sendEmail(user, currentMonth);
          } else if (discountCurrentDateAndUserPayday === 0) {
            await this.sendEmail(user, currentMonth);
          }
        }
      }
    }
  }

  private async sendEmail(user: any, currentMonth: number) {
    await this.mailer.sendMail({
      subject: `🚀 ${user.name}! Você está em débito com o Gestor Combate`,
      to: [user.email],
      context: {
        plan: user.Plan,
        payday: user.payday,
        currentMonth: currentMonth,
        url: process.env.BASE_URL_FRONT,
      },
      template: 'notify-late-invoice',
    });
  }
}
