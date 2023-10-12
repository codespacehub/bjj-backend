import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/application/entities/user';
import { CreateAndUpdateUserDto } from '../dtos/create-and-update-user.dto';
import { IUserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateAndUpdateUserDto) {
    const {
      cpf,
      name,
      plan,
      role,
      email,
      phone,
      payday,
      modality,
      password,
      birth_date,
      graduation,
      total_class,
      organization,
      color_graduation,
    } = createUserDto;

    const new_user = new User({
      cpf,
      name,
      plan,
      role,
      email,
      phone,
      payday,
      password,
      birth_date,
      graduation,
      total_class,
      organization,
      color_graduation,
    });

    return await this.userRepository.create(new_user);
  }
}
