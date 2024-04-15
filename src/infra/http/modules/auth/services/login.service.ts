import {
  Inject,
  Injectable,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign } from 'jsonwebtoken';

import { compare } from 'bcrypt';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { IOrganizationRepository } from 'src/application/repositories/organization.repository';

@Injectable()
export class LoginService {
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

  async execute(loginDto: any) {
    const findUser = await this.userRepository.findByEmail(loginDto.email);
    const findOrganization = await this.organizationRepository.findById(
      findUser.organization_id,
    );

    if (findUser) {
      if (!findOrganization.active) {
        throw new ForbiddenException(
          'Sua organização está desativada, entre em contato com a Gestor Combate',
        );
      }

      if (!findUser.active) {
        throw new ForbiddenException('Seu usuário está desabilitado');
      }

      const comparePasswordToHash = await compare(
        loginDto.password,
        findUser.password,
      );
      if (!comparePasswordToHash) {
        throw new UnauthorizedException('Usuário e/ou senha inválidos');
      }

      const email = findUser.email.toString().trim();
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
          modality: findUser.modality_id,
          graduation: findUser.graduation_id,
          birth_date: findUser.birth_date,
          house_number: findUser.house_number,
          organization: findUser.organization_id,
        }),
      };

      const expiresIn = this.jwtExpiresIn
        ? this.jwtExpiresIn * 1000
        : this.DAY_IN_MILLISECONDS;
        
        const access_token = sign(payload, this.jwtSecret, {
          expiresIn: expiresIn,
        });

      return {
        token: access_token,
      };
    }

    throw new BadRequestException();
  }
}
