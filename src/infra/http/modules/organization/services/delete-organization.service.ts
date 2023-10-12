import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { IMailer } from '@/shared/interface/mail/mailer.interface';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DeleteOrganizationService {
  constructor(
    @Inject('IMailer') private readonly mailer: IMailer,
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(organizationId: string): Promise<any> {
    const findOrganization: any =
      await this.organizationRepository.findById(organizationId);

    const findUsersOwner = findOrganization.users.filter(
      (user: any) => user.role === 'Owner',
    );

    if (findOrganization.users.length > 0) {
      for (let user of findOrganization.users) {
        // DeleteUserService
      }
    }

    if (!findOrganization) {
      throw new NotFoundException(
        '🥲 Essa organização não existe, tente novamente',
      );
    }

    let usersEmails = [];

    for (let user of findUsersOwner) {
      usersEmails.push(user.email);
    }

    await this.mailer.sendMail({
      subject: `❌ Sua organização foi deletada!`,
      to: usersEmails,
      context: {
        organizationName: findOrganization.name,
      },
      template: 'delete-organization',
    });

    return this.organizationRepository.remove(organizationId);
  }
}
