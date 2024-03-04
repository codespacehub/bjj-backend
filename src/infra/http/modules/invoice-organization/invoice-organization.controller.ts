import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { CreateInvoicesOrganizationService } from './services/create-invoice-users.service';
import { DeleteInvoiceOrganizationService } from './services/delete-invoice-organization.service';
import { UpdateInvoiceOrganizationService } from './services/update-invoice-organization.service';
import { FindAllInvoicesOrganizationService } from './services/find-all-invoice-organization.service';
import { FindInvoicesOrganizationByIdService } from './services/find-invoice-organization-by-id.service';
import { CreateAndUpdateInvoiceOrganizationDto } from './dtos/create-and-update-invoice-organization.dto';
import { UpdatePaidOutInvoiceOrganizationService } from './services/update-invoice-organization-paid-out.service';


@Controller({ version: '1', path: 'invoices-organizations' })
export class InvoiceOrganizationController {
  constructor(
    private readonly deleteInvoiceOrganizationService: DeleteInvoiceOrganizationService,
    private readonly updateInvoiceOrganizationService: UpdateInvoiceOrganizationService,
    private readonly createInvoicesOrganizationService: CreateInvoicesOrganizationService,
    private readonly findAllInvoicesOrganizationService: FindAllInvoicesOrganizationService,
    private readonly findInvoicesOrganizationByIdService: FindInvoicesOrganizationByIdService,
    private readonly updatePaidOutInvoiceOrganizationService: UpdatePaidOutInvoiceOrganizationService,
    
  ) {}

  // @Cron('0 09 1 * *')
  @Post()
  create() {
    return this.createInvoicesOrganizationService.execute();
  }

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll() {
    return this.findAllInvoicesOrganizationService.execute();
  }

  @Get(':invoiceId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findById(@Param('invoiceId') invoiceId: string) {
    return this.findInvoicesOrganizationByIdService.execute(invoiceId);
  }

  @Delete(':invoiceId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  delete(@Param('invoiceId') invoiceId: string) {
    return this.deleteInvoiceOrganizationService.execute(invoiceId);
  }

  @Patch(':invoice_id')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  updateInvoice(
    @Param('invoice_id') invoice_id: string,
    @Body() invoiceDto: CreateAndUpdateInvoiceOrganizationDto,
  ) {
    return this.updateInvoiceOrganizationService.execute(invoice_id, invoiceDto);
  }
  @Patch('/paidout/:invoice_id')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  updatePaidOut(@Param('invoice_id') invoice_id: string) {
    return this.updatePaidOutInvoiceOrganizationService.execute(invoice_id);
  }
}
