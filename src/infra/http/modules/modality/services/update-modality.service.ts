import { Injectable } from '@nestjs/common';

import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { CreateOrUpdateModalityDto } from '../dto/create-or-update-modality.dto';

@Injectable()
export class UpdateModalityService {
  async execute(
    user: TLoggedUser,
    createOrUpdateModalityDto: CreateOrUpdateModalityDto,
  ) {
    return true;
  }
}
