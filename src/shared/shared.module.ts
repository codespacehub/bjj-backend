import { Global, Module } from '@nestjs/common';
import { OrganizationRepositoryProvider } from 'src/application/entities/organization';
import { UserRepositoryProvider } from 'src/application/entities/user';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CreateHashAdapterProvider } from './libs/bcryptjs/create-hash.adapter';
import { NodeMailerAdapterProvider } from './libs/nodemailer/nodemailer.adapter';
import { ModalityRepositoryProvider } from '@/application/entities/modality';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepositoryProvider,
    CreateHashAdapterProvider,
    NodeMailerAdapterProvider,
    ModalityRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
  exports: [
    PrismaService,
    UserRepositoryProvider,
    CreateHashAdapterProvider,
    NodeMailerAdapterProvider,
    ModalityRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
})
export class SharedModule {}
