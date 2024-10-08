import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';

import { lastValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { updateOrganizationDto } from './dtos/update-organization.dto';
import { CreateOrganizationService } from './services/create-organization.service';
import { DeleteOrganizationService } from './services/delete-organization.service';
import { UpdateOrganizationService } from './services/update-organization.service';
import { CheckPaydayUserService } from '../user/services/check-payday-user.service';
import { FindAllOrganizationService } from './services/find-all-organization.service';
import { FindOrganizationByIdService } from './services/find-organization-by-id.service';
import { UpdateActiveByIdService } from './services/update-active-organization.service';
import { CalculationInvoiceUsersService } from './services/calculation-invoice-users.service';
import { CalculationInvoiceOrganizationsService } from './services/calculation-invoice-organizations.service';

@ApiTags('Organização')
@Controller({ version: '1', path: 'organizations' })
export class OrganizationController {
  constructor(
    private readonly updateActiveByIdService: UpdateActiveByIdService,
    private readonly createOrganizationService: CreateOrganizationService,
    private readonly updateOrganizationService: UpdateOrganizationService,
    private readonly deleteOrganizationService: DeleteOrganizationService,
    private readonly findAllOrganizationService: FindAllOrganizationService,
    private readonly findOrganizationByIdService: FindOrganizationByIdService,
    private readonly calculationInvoiceUsersService: CalculationInvoiceUsersService,
    private readonly calculationInvoiceOrganizationsService: CalculationInvoiceOrganizationsService,

    private readonly httpService: HttpService,
  ) {}

  @Get()
  findAll() {
    return this.findAllOrganizationService.execute();
  }

  @Get(':organizationId')
  async findById(@Param('organizationId') organizationId: string) {
    return await this.findOrganizationByIdService.execute(organizationId);
  }

  @Post()
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

  @Get('cep/:CEP')
  async getCep(@Param('CEP') cep: string) {
    const { data } = await lastValueFrom(
      this.httpService.get(`http://viacep.com.br/ws/${cep}/json/`),
    );

    if(data.erro === "true") {
      throw new Error("Cep inválido");
    }

    return data;
  }

  @Patch('active/:organizationId')
  updateActiveById(@Param('organizationId') organizationId: string) {
    return this.updateActiveByIdService.execute(organizationId);
  }

  @Get('invoices-users/:organizationId')
  financialCalculateUsers(@Param('organizationId') organizationId: string) {
    return this.calculationInvoiceUsersService.execute(organizationId);
  }

  @Get('invoices/value')
  financialCalculateOrganizations() {
    return this.calculationInvoiceOrganizationsService.execute();
  }
}
