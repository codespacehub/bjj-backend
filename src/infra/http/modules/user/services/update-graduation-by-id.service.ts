import { IGraduationRepository } from '@/application/repositories/graduation.repository';
import { IUserRepository } from '@/application/repositories/user.repository';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UpdateGraduationByIdService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IGraduationRepository')
    private readonly graduationRepository: IGraduationRepository,
  ) {}

  async execute(userId: string) {
    const findUser: any = await this.userRepository.findById(userId);

    if (!findUser) {
      throw new NotFoundException(
        '🥲 Esse usuário não existe, tente novamente',
      );
    }

    const graduations = await this.graduationRepository.findAll(
      findUser.organization_id,
    );

    const findGraduationByUserGraduationOrder: any = graduations.find(
      (graduation) => graduation.order === findUser.Graduation.order + 1,
    );

    if (findGraduationByUserGraduationOrder) {
      await this.userRepository.updateGraduationForUser(
        userId,
        findGraduationByUserGraduationOrder.id,
      );
    } else {
      throw new ConflictException(
        '🥲 Esse usuário já está no máximo da sua graduação',
      );
    }
  }
}
