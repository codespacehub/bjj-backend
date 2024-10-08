import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

import {
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
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    const token = request.headers.authorization?.split(' ')[1];

    if (token && token != 'undefined') {
      try {
        const decoded: any = jwt.verify(token, this.jwtSecret);

        if (decoded) {
          const jwt = await JSON.parse(decoded.sub.toString());
          
          request.user = {
            id: jwt.id,
            uf: jwt.uf,
            cpf: jwt.cpf,
            cep: jwt.cep,
            name: jwt.name,
            plan: jwt.plan,
            role: jwt.role,
            city: jwt.city,
            email: jwt.email,
            phone: jwt.phone,
            street: jwt.street,
            district: jwt.district,
            verified: jwt.verified,
            modality: jwt.modality,
            graduation: jwt.graduation,
            birth_date: jwt.birth_date,
            house_number: jwt.house_number,
            organization: jwt.organization,
          } as TLoggedUser;

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
