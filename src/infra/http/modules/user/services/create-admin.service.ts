import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { IUserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class CreateAdminService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    userDto: CreateAndUpdateUserDto,
    user?: TLoggedUser,
  ): Promise<any> {
    const org = user.organization;

    const {
      uf,
      cpf,
      cep,
      name,
      city,
      role,
      phone,
      email,
      payday,
      street,
      plan_id,
      district,
      password,
      birth_date,
      modality_id,
      amount_class,
      house_number,
      graduation_id,
    } = userDto;
    const new_user = new User({
      uf,
      cpf,
      cep,
      name,
      city,
      role,
      email,
      phone,
      payday,
      street,
      password,
      district,
      photo_url: '',
      birth_date,
      house_number,
      amount_class,
      plan: plan_id,
      organization_id: org,
      modality_id: modality_id,
      graduation_id: graduation_id,
    });

    return await this.userRepository.create(new_user);
  }
}
