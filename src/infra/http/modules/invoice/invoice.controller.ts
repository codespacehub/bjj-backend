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
import { CreateInvoiceUsersForCronService } from './service/create-invoices-users-for-cron.service';
import { UpdatePaidOutService } from './service/update-paid-out.service';
import { FindAllInvoicesService } from './service/find-all-invoice.service';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';
import { FindInvoicesByIdService } from './service/find-invoice-by-id.service';
import { Cron } from '@nestjs/schedule';
import { UpdateInvoiceService } from './service/update-invoice.service';
import { CreateInvoiceUserService } from './service/create-invoice-user.service';
import { CreateAndUpdateInvoiceDto } from './dtos/create-and-update-invoice.dto';

@Controller({ version: '1', path: 'invoices' })
export class InvoiceController {
  constructor(
    private readonly deleteInvoiceService: DeleteInvoiceService,
    private readonly updatePaidOutService: UpdatePaidOutService,
    private readonly updateInvoiceService: UpdateInvoiceService,
    private readonly findAllInvoiceService: FindAllInvoicesService,
    private readonly findInvoiceByIdService: FindInvoicesByIdService,
    private readonly createInvoiceUserService: CreateInvoiceUserService,
    private readonly createInvoiceUsersForCronService: CreateInvoiceUsersForCronService,
  ) {}

  @Cron('0 09 1 * *')
  @Post()
  createInvoiceUserByCron() {
    return this.createInvoiceUsersForCronService.execute();
  }

  @Post(':user_id')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createInvoiceUser(
    @Param('user_id') user_id: string,
  ) {
    return this.createInvoiceUserService.execute(user_id)
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
  updateInvoice(
    @Param('invoice_id') invoice_id: string,
    @Body() invoiceDto: CreateAndUpdateInvoiceDto,
  ) {
    return this.updateInvoiceService.execute(invoice_id, invoiceDto);
  }

  @Patch('/paidout/:invoice_id')
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  updatePaidOut(@Param('invoice_id') invoice_id: string) {
    return this.updatePaidOutService.execute(invoice_id);
  }
}
