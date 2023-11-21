import { Global, Module } from '@nestjs/common';

import { TimeRepositoryProvider } from '../application/entities/time';
import { PlanRepositoryProvider } from '@/application/entities/plan';
import { UserRepositoryProvider } from 'src/application/entities/user';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ModalityRepositoryProvider } from '@/application/entities/modality';
import { CreateHashAdapterProvider } from './libs/bcryptjs/create-hash.adapter';
import { NodeMailerAdapterProvider } from './libs/nodemailer/nodemailer.adapter';
import { GraduationRepositoryProvider } from '@/application/entities/graduation';
import { OrganizationRepositoryProvider } from 'src/application/entities/organization';
import { PresenceRepositoryProvider } from '@/application/entities/presence';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepositoryProvider,
    PlanRepositoryProvider,
    TimeRepositoryProvider,
    CreateHashAdapterProvider,
    NodeMailerAdapterProvider,
    ModalityRepositoryProvider,
    PresenceRepositoryProvider,
    GraduationRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
  exports: [
    PrismaService,
    UserRepositoryProvider,
    PlanRepositoryProvider,
    TimeRepositoryProvider,
    CreateHashAdapterProvider,
    NodeMailerAdapterProvider,
    ModalityRepositoryProvider,
    PresenceRepositoryProvider,
    GraduationRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
})
export class SharedModule {}
