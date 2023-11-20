import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class DeleteGraduationService {
  constructor(
    @Inject('IGraduationRepository')
    private readonly graduationRepository: IGraduationRepository,
  ) {}

  async execute(graduationId: string) {
    const findGraduation: any =
      await this.graduationRepository.findById(graduationId);

    if (!findGraduation) {
      throw new NotFoundException('Graduação informada não existe');
    }

    if (findGraduation.users.length > 0) {
      throw new ConflictException(
        'Existem usuários conectados a essa graduação',
      );
    }

    return this.graduationRepository.remove(graduationId);
  }
}
