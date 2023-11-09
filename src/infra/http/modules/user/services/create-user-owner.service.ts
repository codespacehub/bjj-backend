import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/application/entities/user';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { IUserRepository } from 'src/application/repositories/user.repository';

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
      degree,
      phone,
      payday,
      street,
      password,
      modality,
      district,
      birth_date,
      graduation,
      organization,
      amount_class,
      house_number,
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
    });

    return await this.userRepository.create(new_user);
  }
}
