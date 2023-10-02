import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';
import { ApiSecurity } from '@nestjs/swagger';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { CreateOrganizationService } from './services/create-organization.service';

@Controller()
export class OrganizationController {
  constructor(
    private readonly findOrganizationByIdService: FindOrganizationByIdService,
    private readonly createOrganizationService: CreateOrganizationService,
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
}
