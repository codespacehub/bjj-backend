import {
  Inject,
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

import { Cache } from 'cache-manager';

import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign } from 'jsonwebtoken';

import { IUserRepository } from 'src/application/repositories/user.repository';
import { IOrganizationRepository } from 'src/application/repositories/organization.repository';
import { compare } from 'bcrypt';

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

    if (findUser) {
      // if (!findOrganization.active) {
      //   throw new ForbiddenException('Sua organização está desabilitada');
      // }

      // if (!findUser.active) {
      //   throw new ForbiddenException('Seu usuário está desabilitado');
      // }

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
          email: email,
          id: findUser.id,
          cpf: findUser.cpf,
          name: findUser.name,
          role: findUser.role,
          phone: findUser.phone,
          verified: findUser.verified,
          organization: findUser.organization,
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

    throw new BadRequestException();
  }
}
