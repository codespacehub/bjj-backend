import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { User } from 'src/application/entities/user';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { CreateAndUpdateUserDto } from '@/infra/http/modules/user/dtos/create-and-update-user.dto';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<any> {
    const findUserByEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUserByEmail) {
      throw new Error('User not found');
    }

    return findUserByEmail;
  }

  async create(user: User): Promise<any> {
    const raw = PrismaUserMapper.toPrisma(user);

    return await this.prisma.user.create({
      data: raw,
    });
  }

  async findById(userId: string): Promise<any> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: String(userId),
      },
    });

    if (!findUser) {
      throw new Error('Usuário não encontrado');
    }

    return findUser;
  }

  async remove(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: String(userId),
      },
    });
  }

  async update(
    userId: string,
    updateUserDto: CreateAndUpdateUserDto,
  ): Promise<any> {
    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        cpf: updateUserDto.cpf,
        name: updateUserDto.name,
        email: updateUserDto.email,
        birth_date: updateUserDto.birth_date,
        phone: updateUserDto.birth_date,
        role: updateUserDto.role,
        password: updateUserDto.password,
        color_graduation: updateUserDto.color_graduation,
        plan: updateUserDto.plan,
        payday: updateUserDto.payday,
      },
    });

    return updateUser;
  }

  async updatePassword(userId: string, newPassword: string): Promise<any> {
    const updatePassword = await this.prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        password: String(newPassword),
      },
    });

    return updatePassword;
  }

  async updateGraduation(userId: string, newGraduation: string): Promise<any> {
    console.log(newGraduation);
    const updateGraduation = await this.prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        graduation: String(newGraduation),
      },
    });

    return updateGraduation;
  }

  async findAll(organization: string): Promise<any> {
    const users = await this.prisma.user.findMany({
      where: {
        organization,
      },
    });

    return users;
  }
}
