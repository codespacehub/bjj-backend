import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { User } from 'src/application/entities/user';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { IUserRepository } from 'src/application/repositories/user.repository';
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
      throw new NotFoundException('Usuário informado não existe');
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
        role: updateUserDto.role,
        email: updateUserDto.email,
        plan: updateUserDto.plan_id,
        payday: updateUserDto.payday,
        phone: updateUserDto.birth_date,
        password: updateUserDto.password,
        birth_date: updateUserDto.birth_date,
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
        verified: true,
      },
    });

    return updatePassword;
  }

  async findAll(organization_id: string): Promise<any> {
    const users = await this.prisma.user.findMany({
      where: {
        organization_id,
      },
      include: {
        Plan: true,
        Modality: true,
        Graduation: true,
      },
    });

    return users;
  }
}
