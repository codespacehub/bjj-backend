import { Global, Module } from '@nestjs/common';
import { OrganizationRepositoryProvider } from 'src/application/entities/organization';
import { UserRepositoryProvider } from 'src/application/entities/user';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CreateHashAdapterProvider } from './libs/bcryptjs/create-hash.adapter';
import { NodeMailerAdapterProvider } from './libs/nodemailer/nodemailer.adapter';
import { ModalityRepositoryProvider } from '@/application/entities/modality';
import { GraduationRepositoryProvider } from '@/application/entities/graduation';
import { TeacherRepositoryProvider } from '@/application/entities/teacher';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepositoryProvider,
    CreateHashAdapterProvider,
    NodeMailerAdapterProvider,
    TeacherRepositoryProvider,
    ModalityRepositoryProvider,
    GraduationRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
  exports: [
    PrismaService,
    UserRepositoryProvider,
    CreateHashAdapterProvider,
    NodeMailerAdapterProvider,
    TeacherRepositoryProvider,
    ModalityRepositoryProvider,
    GraduationRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
})
export class SharedModule {}
