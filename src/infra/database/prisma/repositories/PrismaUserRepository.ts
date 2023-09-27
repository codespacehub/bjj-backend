import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';

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
}
