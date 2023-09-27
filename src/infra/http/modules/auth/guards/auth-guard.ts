import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

import {
  Inject,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TLoggedUser } from 'src/shared/interface/user/logged-user.interface';

@Injectable()
export class JwtAuthzGuard {
  private jwtSecret = this.configService.get('jwtAuth.jwtSecret');

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (token && token != 'undefined') {
      try {
        const decoded: any = jwt.verify(token, this.jwtSecret);

        if (decoded) {
          const jwt = await JSON.parse(decoded.sub.toString());

          const validJwt = await this.cacheManager.get(jwt.email.toString());

          request.user = {
            id: jwt.id,
            cpf: jwt.cpf,
            name: jwt.name,
            role: jwt.role,
            email: jwt.email,
            phone: jwt.phone,
            verified: jwt.verified,
            organization: jwt.organization,
          } as TLoggedUser;

          if (validJwt === token) {
            return true;
          }
          return true;
        } else {
          throw new UnauthorizedException(
            'Rota não foi autorizada',
            'Token informado não segue a criptografia de acesso',
          );
        }
      } catch (err) {
        console.error(err);
        throw new UnauthorizedException(
          'Rota não foi autorizada',
          'Ocorreu um error ao decodificar o token de acesso',
        );
      }
    }

    throw new UnauthorizedException(
      'Rota não foi autorizada',
      'Por favor informe nos header o Authorization com o token de acesso à rota.',
    );
  }
}
