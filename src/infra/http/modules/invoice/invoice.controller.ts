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
import { User } from '@/shared/decorators/user.decorator';
import { DeleteInvoiceService } from './service/delete-invoice.service';
import { CreateInvoiceService } from './service/create-invoice.service';
import { UpdatePaidOutService } from './service/update-paid-out.service';
import { FindAllInvoicesService } from './service/find-all-invoice.service';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { FindInvoicesByIdService } from './service/find-invoice-by-id.service';
import { Cron } from '@nestjs/schedule';

@Controller({ version: '1', path: 'invoices' })
export class InvoiceController {
  constructor(
    private readonly createInvoiceService: CreateInvoiceService,
    private readonly deleteInvoiceService: DeleteInvoiceService,
    private readonly findAllInvoiceService: FindAllInvoicesService,
    private readonly findInvoiceByIdService: FindInvoicesByIdService,
    private readonly updatePaidOutService: UpdatePaidOutService,
  ) {}

  @Cron('0 9 01 * *')
  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  create() {
    return this.createInvoiceService.execute();
  }

  @Get()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findAll(@User() user: TLoggedUser) {
    return this.findAllInvoiceService.execute(user);
  }

  @Get(':invoiceId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  findById(@Param('invoiceId') invoiceId: string) {
    return this.findInvoiceByIdService.execute(invoiceId);
  }

  @Delete(':invoiceId')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  delete(@Param('invoiceId') invoiceId: string) {
    return this.deleteInvoiceService.execute(invoiceId);
  }

  @Patch(':invoice_id')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  update(@Param('invoice_id') invoice_id: string) {
    return this.updatePaidOutService.execute(invoice_id);
  }
}
