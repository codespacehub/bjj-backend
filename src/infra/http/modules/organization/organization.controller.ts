import { ApiSecurity } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';
import { CreateOrganizationService } from './services/create-organization.service';
import { UpdateOrganizationService } from './services/update-organization.service';
import { updateOrganizationDto } from './dtos/update-organization.dto';
import { DeleteOrganizationService } from './services/delete-organization.service';
import { FindAllOrganizationService } from './services/find-all-organization.service';
import { User } from '@/shared/decorators/user.decorator';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly createOrganizationService: CreateOrganizationService,
    private readonly updateOrganizationService: UpdateOrganizationService,
    private readonly deleteOrganizationService: DeleteOrganizationService,
    private readonly findAllOrganizationService: FindAllOrganizationService,
    private readonly findOrganizationByIdService: FindOrganizationByIdService,
  ) {}

  @Get(':organizationId')
  async findById(@Param('organizationId') organizationId: string) {
    return await this.findOrganizationByIdService.execute(organizationId);
  }

  @Post()
  @ApiSecurity('bearerAuth')
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.createOrganizationService.execute(createOrganizationDto);
  }

  @Patch(':organizationId')
  async update(
    @Param('organizationId') organizationId: string,
    @Body() updateOrg: updateOrganizationDto,
  ) {
    return this.updateOrganizationService.execute(organizationId, updateOrg);
  }

  @Delete(':organizationId')
  deleteOrganization(@Param('organizationId') organizationId: string) {
    return this.deleteOrganizationService.execute(organizationId);
  }

  @Get()
  findAll() {
    return this.findAllOrganizationService.execute();
  }
}
