import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

import { CreateAdminService } from '../user/services/create-admin.service';
import { CreateOrganizationService } from './services/create-organization.service';
import { UpdateOrganizationService } from './services/update-organization.service';
import { DeleteOrganizationService } from './services/delete-organization.service';
import { FindAllOrganizationService } from './services/find-all-organization.service';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';

@Module({
  controllers: [OrganizationController],
  providers: [
    CreateAdminService,
    CreateOrganizationService,
    UpdateOrganizationService,
    DeleteOrganizationService,
    FindAllOrganizationService,
    FindOrganizationByIdService,
  ],
})
export class OrganizationModule {}
