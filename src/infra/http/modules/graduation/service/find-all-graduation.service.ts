import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FindAllGraduationService {
  constructor(
    @Inject('IGraduationRepository')
    private readonly graduationRepository: IGraduationRepository,
  ) {}

  async execute(organizationId: string) {
    return await this.graduationRepository.findAll(organizationId);
  }
}
