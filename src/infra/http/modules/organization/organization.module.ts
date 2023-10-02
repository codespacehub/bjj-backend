import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';

@Module({
  controllers: [OrganizationController],
  providers: [FindOrganizationByIdService],
})
export class OrganizationModule {}
