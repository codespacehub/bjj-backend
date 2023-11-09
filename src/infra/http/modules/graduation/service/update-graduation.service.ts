import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateAndUpdateGraduationDto } from '../dto/create-and-update-graduation';

@Injectable()
export class UpdateGraduationService {
  constructor(
    @Inject('IGraduationRepository')
    private readonly graduationRepository: IGraduationRepository,
  ) {}

  async execute(
    newGraduation: CreateAndUpdateGraduationDto,
    idGraduation: string,
  ) {
    const findGraduation =
      await this.graduationRepository.findById(idGraduation);

    if (!findGraduation) {
      throw new NotFoundException(
        'Esta graduação já foi excluída meu faixa preta',
      );
    }

    const { name, color_degree } = newGraduation;

    const graduation = {
      name,

      color_degree,
    };

    return this.graduationRepository.update(graduation, idGraduation);
  }
}