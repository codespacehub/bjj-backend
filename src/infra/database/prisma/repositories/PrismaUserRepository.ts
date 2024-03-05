import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

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
      throw new NotFoundException(
        'E-mail informado não possui cadastro no gestor combate',
      );
    }

    return findUserByEmail;
  }

  async findExistUserByEmail(email: string): Promise<any> {
    const findUserByEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUserByEmail) {
      return
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
      include: {
        times: true,
        Presence: true,
        Graduation: true,
        Invoices: true,
        Modality: true,
        Plan: true,
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
        uf: updateUserDto.uf,
        cpf: updateUserDto.cpf,
        cep: updateUserDto.cep,
        role: updateUserDto.role,
        city: updateUserDto.city,
        name: updateUserDto.name,
        email: updateUserDto.email,
        plan: updateUserDto.plan_id,
        street: updateUserDto.street,
        payday: updateUserDto.payday,
        phone: updateUserDto.birth_date,
        district: updateUserDto.district,
        birth_date: updateUserDto.birth_date,
        house_number: updateUserDto.house_number,
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
        Invoices: true,
      },
    });

    return users;
  }

  async updateAmountClass(userId: string): Promise<any> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        amount_class: findUser.amount_class + 1,
      },
    });
  }

  async updateActiveById(userId: string): Promise<void> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        active: findUser.active ? false : true,
      },
    });
  }

  async updateGraduationForUser(
    userId: string,
    graduation_id: string,
  ): Promise<any> {
    const newGraduation = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        graduation_id,
      },
    });

    return newGraduation;
  }

  async findByCpf(cpf: string): Promise<any> {
    const findByCpf = await this.prisma.user.findUnique({
      where: {
        cpf
      }
    })

    if(!findByCpf) {
      return
    }

    return findByCpf
  }
}
