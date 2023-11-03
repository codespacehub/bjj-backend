import { ITeacherRepository } from '@/application/repositories/teacher.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IGraduationRepository } from '@/application/repositories/graduation.repository';

@Injectable()
export class PrismaGraduationRepository implements IGraduationRepository {
  constructor(private prisma: PrismaService) {}
}
