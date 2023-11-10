import { Injectable } from '@nestjs/common';

@Injectable()
export class FindModalityByIdService {
  async execute(modalityId: string) {
    return modalityId;
  }
}
