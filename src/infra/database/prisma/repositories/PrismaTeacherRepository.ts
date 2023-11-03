import { ITeacherRepository } from '@/application/repositories/teacher.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTeacherRepository implements ITeacherRepository {
  constructor(private prisma: PrismaService) {}
}
