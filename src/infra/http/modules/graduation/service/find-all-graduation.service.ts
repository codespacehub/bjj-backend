import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FindAllGraduationService {
  constructor(
    @Inject('IGraduationRepository')
    private readonly graduationRepository: IGraduationRepository,
  ) {}

  execute() {
    return this.graduationRepository.findAll();
  }
}
