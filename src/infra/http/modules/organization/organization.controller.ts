import { Controller, Get, Param } from '@nestjs/common';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';

@Controller()
export class OrganizationController {
  constructor(
    private readonly findOrganizationByIdService: FindOrganizationByIdService,
  ) {}

  @Get(':organizationId')
  async findById(@Param('organizationId') organizationId: string) {
    return await this.findOrganizationByIdService.execute(organizationId);
  }
}
