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

  async execute(createUserDto: CreateAndUpdateUserDto): Promise<any> {
    const new_user = new User({
      uf: createUserDto.uf,
      cpf: createUserDto.cpf,
      cep: createUserDto.cep,
      name: createUserDto.name,
      plan: createUserDto.plan,
      city: createUserDto.city,
      role: createUserDto.role,
      email: createUserDto.email,
      phone: createUserDto.phone,
      degree: createUserDto.degree,
      payday: createUserDto.payday,
      street: createUserDto.street,
      password: createUserDto.password,
      district: createUserDto.district,
      modality: createUserDto.modality,
      birth_date: createUserDto.birth_date,
      graduation: createUserDto.graduation,
      organization: createUserDto.organization,
      amount_class: createUserDto.amount_class,
      house_number: createUserDto.house_number,
    });

    return await this.userRepository.create(new_user);
  }
}
