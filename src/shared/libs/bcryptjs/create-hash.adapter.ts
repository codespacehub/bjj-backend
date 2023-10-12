import { Injectable } from '@nestjs/common';

import { hash } from 'bcryptjs';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';

@Injectable()
export class CreateHashAdapter implements ICreateHash {
  async execute(data: string): Promise<string> {
    const hashSalt = 10;
    return hash(data, hashSalt);
  }
}

export const CreateHashAdapterProvider = {
  provide: 'ICreateHash',
  useClass: CreateHashAdapter,
};
