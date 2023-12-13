import { IOrganizationRepository } from '@/application/repositories/organization.repository';
import { IUserRepository } from '@/application/repositories/user.repository';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign } from 'jsonwebtoken';

@Injectable()
export class LoginNoAuthService {
  private DAY_IN_MILLISECONDS = 86400000;
  private jwtSecret = this.configService.get('jwtAuth.jwtSecret');
  private jwtExpiresIn = this.configService.get('jwtAuth.expiresIn');

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(user: TLoggedUser) {
    const findUser = await this.userRepository.findByEmail(user.email);
    const payload: JwtPayload = {
      sub: JSON.stringify({
        id: findUser.id,
        uf: findUser.uf,
        cpf: findUser.cpf,
        cep: findUser.cep,
        name: findUser.name,
        plan: findUser.plan,
        role: findUser.role,
        city: findUser.city,
        email: findUser.email,
        phone: findUser.phone,
        street: findUser.street,
        district: findUser.district,
        verified: findUser.verified,
        modality: findUser.modality,
        graduation: findUser.graduation,
        birth_date: findUser.birth_date,
        house_number: findUser.house_number,
        organization: findUser.organization_id,
      }),
    };

    const expiresIn = this.jwtExpiresIn
      ? Number(this.jwtExpiresIn) * 1000
      : this.DAY_IN_MILLISECONDS;

    const access_token = sign(payload, this.jwtSecret, {
      expiresIn: expiresIn,
    });

    return {
      token: access_token.toString(),
    };
  }
}
