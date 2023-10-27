import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';
import { CreateOrganizationService } from './services/create-organization.service';
import { UpdateOrganizationService } from './services/update-organization.service';
import { DeleteOrganizationService } from './services/delete-organization.service';
import { FindAllOrganizationService } from './services/find-all-organization.service';
import { UpdateGraduationService } from '../user/services/update-graduation.service';
import { CreateUserOwnerService } from '../user/services/create-user-owner.service';

@Module({
  controllers: [OrganizationController],
  providers: [
    CreateUserOwnerService,
    CreateOrganizationService,
    UpdateOrganizationService,
    FindOrganizationByIdService,
    DeleteOrganizationService,
    FindAllOrganizationService,
    UpdateGraduationService,
  ],
})
export class OrganizationModule {}
