import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/application/repositories/user.repository';
import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { getDate, getMonth } from 'date-fns';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import { ConfigService } from '@nestjs/config';

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
        let userOwners = [];

        if (user.role === 'Admin') {
          userOwners.push(user);
        }

        if (user.role === 'Aluno') {
          const currentDate = new Date();
          const currentDay = getDate(currentDate);
          const currentMonth = getMonth(currentDate);

          const discountCurrentDateAndUserPayday = user.payday - currentDay;

          if (discountCurrentDateAndUserPayday === 1) {
            for (let userOwner of userOwners) {
              this.sendEmail(userOwner, currentMonth);
              // Enviar e-mail para o usuário que está em 'user'
            }

            this.sendEmail(user, currentMonth);
          } else if (discountCurrentDateAndUserPayday === 0) {
            for (let userOwner of userOwners) {
              await this.mailer.sendMail({
                subject: `🚀 ${user.name}! Você está em débito com o Gestor Combate`,
                to: [user.email],
                context: {
                  plan: user.Plan,
                  payday: user.payday,
                  currentMonth: currentMonth,
                  url: `${this.configService.get('urlStripe')}`,
                },
                template: 'notify-late-invoice',
              });
            }

            this.sendEmail(user, currentMonth);
            // Enviar e-mail para o usuário que está em 'user'
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
        url: `${this.configService.get('urlStripe')}`,
      },
      template: 'notify-late-invoice',
    });
  }
}
