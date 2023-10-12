import { IUserRepository } from '@/application/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateGraduationService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(user: string, newGraduation: string) {}
}
