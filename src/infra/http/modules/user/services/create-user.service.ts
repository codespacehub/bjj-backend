import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const newUser = new User({
      name: createUserDto.name,
      email: createUserDto.email,
      cpf: createUserDto.cpf,
    });

    return await this.userRepository.create(newUser);
  }
}
