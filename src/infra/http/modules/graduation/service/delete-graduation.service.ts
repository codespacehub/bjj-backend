import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteGraduationService {
  constructor(
    @Inject('IGraduationRepository')
    private readonly graduationRepository: IGraduationRepository,
  ) {}

  execute(idGraduation: string) {
    return this.graduationRepository.remove(idGraduation);
  }
}
