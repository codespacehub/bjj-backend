import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Invoice } from '@/application/entities/invoice';
import { PrismaInvoiceMapper } from '../mappers/PrismaInvoiceMapper';
import { IInvoiceRepository } from '@/application/repositories/invoice.repository';
import { CreateAndUpdateInvoiceDto } from '@/infra/http/modules/invoice/dtos/create-and-update-invoice.dto';

@Injectable()
export class PrismaInvoiceRepository implements IInvoiceRepository {
  constructor(private prisma: PrismaService) {}

  async create(invoice: Invoice): Promise<any> {
    const raw = PrismaInvoiceMapper.toPrisma(invoice);

    return this.prisma.invoice.create({
      data: {
        id: raw.id,
        paidOut: raw.paidOut,
        value: raw.value,
        user_id: raw.user_id,
        paidDay: String(raw.paidDay),
        organization_id: raw.organization_id,
        created_at: raw.created_at ?? new Date()
      },
    });
  }

  async delete(invoiceId: string): Promise<any> {
    const findInvoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

    if (!findInvoice) {
      return null;
    }

    return this.prisma.invoice.delete({
      where: {
        id: invoiceId,
      },
    });
  }

  async findById(invoiceId: string): Promise<any> {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

    if (!invoice) {
      return null;
    }

    return invoice;
  }

  async findAll(organization_id: string): Promise<any> {
    return this.prisma.invoice.findMany({
      where: {
        organization_id,
      },
      include: {
        User: {
          include: {
            Plan: true,
            times:true,
            Invoices:true,
            Modality:true,
            Presence:true,
            Graduation:true,
          },
        },
        Organization: true,
      },
    });
  }

  async updatePaidOut(invoice_id: string): Promise<any> {
    const findInvoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoice_id,
      },
    });

    if (!findInvoice) {
      return null;
    }

    if (findInvoice.paidDay !== '0') {
      return this.prisma.invoice.update({
        where: {
          id: invoice_id,
        },
        data: {
          paidOut: false,
          paidDay: String(0),
        },
      });
    }

    return this.prisma.invoice.update({
      where: {
        id: invoice_id,
      },
      data: {
        paidOut: true,
        paidDay: String(new Date()),
      },
    });
  }
  async updateInvoice(
    invoice_id: string,
    invoiceDto: CreateAndUpdateInvoiceDto,
  ): Promise<any> {
    const findInvoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoice_id,
      },
    });

    if (!findInvoice) {
      return null;
    }

    return this.prisma.invoice.update({
      where: {
        id: invoice_id,
      },
      data: {
        value: invoiceDto.value,
        paidDay: invoiceDto.paidDay,
        user_id: invoiceDto.user_id,
      },
    });
  }
}
