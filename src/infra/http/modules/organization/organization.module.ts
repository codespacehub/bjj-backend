import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';
import { CreateOrganizationService } from './services/create-organization.service';
import { CreateUserService } from '../user/services/create-user.service';
import { UpdateOrganizationService } from './services/update-organization.service';
import { DeleteOrganizationService } from './services/delete-organization.service';
import { FindAllOrganizationService } from './services/find-all-organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [
    CreateUserService,
    CreateOrganizationService,
    UpdateOrganizationService,
    FindOrganizationByIdService,
    DeleteOrganizationService,
    FindAllOrganizationService,
  ],
})
export class OrganizationModule {}
