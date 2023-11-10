import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

import { CreateOrganizationService } from './services/create-organization.service';
import { UpdateOrganizationService } from './services/update-organization.service';
import { DeleteOrganizationService } from './services/delete-organization.service';
import { CreateUserOwnerService } from '../user/services/create-user-owner.service';
import { FindAllOrganizationService } from './services/find-all-organization.service';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';

@Module({
  controllers: [OrganizationController],
  providers: [
    CreateUserOwnerService,
    CreateOrganizationService,
    UpdateOrganizationService,
    FindOrganizationByIdService,
    DeleteOrganizationService,
    FindAllOrganizationService,
  ],
})
export class OrganizationModule {}
