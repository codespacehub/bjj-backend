import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/application/entities/user';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { ICreateHash } from '@/shared/interface/bcryptjs/create-hash.interface';
import { generateTemporaryPassword } from '@/shared/utils/generate-temporary-password';

@Injectable()
export class CreateUserOwnerService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userDto: CreateAndUpdateUserDto): Promise<any> {
    const {
      uf,
      cpf,
      cep,
      name,
      city,
      plan,
      role,
      email,
      phone,
      degree,
      payday,
      street,
      password,
      modality,
      district,
      birth_date,
      graduation,
      amount_class,
      organization,
      house_number,
      color_graduation,
    } = userDto;
    const new_user = new User({
      uf,
      cpf,
      cep,
      name,
      plan,
      city,
      role,
      email,
      phone,
      degree,
      payday,
      street,
      password,
      district,
      modality,
      birth_date,
      graduation,
      organization,
      amount_class,
      house_number,
      color_graduation,
    });

    return await this.userRepository.create(new_user);
  }
}
