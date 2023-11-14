import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import { Injectable, Inject } from '@nestjs/common';
import { CreateAndUpdateGraduationDto } from '../dto/create-and-update-graduation';
import { Graduation } from '@/application/entities/graduation';

@Injectable()
export class CreateGraduationService {
  constructor(
    @Inject('IGraduationRepository')
    private readonly graduationRepository: IGraduationRepository,
  ) {}

  async execute(
    graduation: CreateAndUpdateGraduationDto,
    organization_id: string,
  ) {
    const { name, color_degree, modality_id } = graduation;

    const new_graduation = new Graduation({
      name,
      color_degree,
      modality_id,
      organization_id,
    });

    return await this.graduationRepository.create(new_graduation);
  }
}
