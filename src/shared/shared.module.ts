import { Global, Module } from '@nestjs/common';
import { OrganizationRepositoryProvider } from 'src/application/entities/organization';
import { UserRepositoryProvider } from 'src/application/entities/user';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
  exports: [
    PrismaService,
    UserRepositoryProvider,
    OrganizationRepositoryProvider,
  ],
})
export class SharedModule {}
