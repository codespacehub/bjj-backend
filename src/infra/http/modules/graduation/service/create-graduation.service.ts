import { Injectable, Inject } from '@nestjs/common';
import { Graduation } from '@/application/entities/graduation';
import { CreateAndUpdateGraduationDto } from '../dto/create-and-update-graduation';
import { IGraduationRepository } from '@/application/repositories/graduation.repository';

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
    const { name, color_degree, modality_id, amount_class } = graduation;

    const new_graduation = new Graduation({
      name,
      modality_id,
      color_degree,
      amount_class,
      organization_id,
    });

    return await this.graduationRepository.create(new_graduation);
  }
}
