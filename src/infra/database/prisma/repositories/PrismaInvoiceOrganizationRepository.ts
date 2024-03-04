import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InvoiceOrganization } from '@/application/entities/invoice-organization';
import { PrismaInvoiceOrganizationMapper } from '../mappers/PrismaInvoiceOrganizationMapper';
import { CreateAndUpdateInvoiceDto } from '@/infra/http/modules/invoice/dtos/create-and-update-invoice.dto';
import { IInvoiceOrganizationRepository } from '@/application/repositories/invoice-organization.repository';
import { CreateAndUpdateInvoiceOrganizationDto } from '@/infra/http/modules/invoice-organization/dtos/create-and-update-invoice-organization.dto';

@Injectable()
export class PrismaInvoiceOrganizationRepository implements IInvoiceOrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async create(invoiceOrganization: InvoiceOrganization): Promise<any> {
    const raw = PrismaInvoiceOrganizationMapper.toPrisma(invoiceOrganization);

    return this.prisma.invoiceOrganization.create({
      data: {
        id: raw.id,
        paidOut: false,
        value: raw.value,
        paidDay: String(raw.paidDay),
        organization_id: raw.organization_id,
      },
    });
  }

  async delete(invoiceOrganizationId: string): Promise<any> {
    const findInvoice = await this.prisma.invoiceOrganization.findUnique({
      where: {
        id: invoiceOrganizationId,
      },
    });

    if (!findInvoice) {
      return null;
    }

    return this.prisma.invoiceOrganization.delete({
      where: {
        id: invoiceOrganizationId,
      },
    });
  }

  async findById(invoiceOrganizationId: string): Promise<any> {
    const invoiceOrganization = await this.prisma.invoiceOrganization.findUnique({
      where: {
        id: invoiceOrganizationId,
      },
      include: {
        Organization: true,
      }
    });

    if (!invoiceOrganization) {
      return null;
    }

    return invoiceOrganization;
  }

  async findAll(): Promise<any> {
    return this.prisma.invoiceOrganization.findMany({
      include: {
        Organization: true,
      },
    });
  }

  async updatePaidOut(invoiceOrganizationId: string): Promise<any> {
    const findInvoice = await this.prisma.invoiceOrganization.findUnique({
      where: {
        id: invoiceOrganizationId,
      },
    });

    if (!findInvoice) {
      return null;
    }

    if (findInvoice.paidDay !== '0') {
      return this.prisma.invoiceOrganization.update({
        where: {
          id: invoiceOrganizationId,
        },
        data: {
          paidOut: false,
          paidDay: String(0),
        },
      });
    }

    return this.prisma.invoiceOrganization.update({
      where: {
        id: invoiceOrganizationId,
      },
      data: {
        paidOut: true,
        paidDay: String(new Date()),
      },
    });
  }

  async updateInvoiceOrganization(invoiceOrganizationId: string, invoiceOrganizationDto: CreateAndUpdateInvoiceOrganizationDto): Promise<any> {
    const findInvoice = await this.prisma.invoiceOrganization.findUnique({
      where: {
        id: invoiceOrganizationId,
      },
    });

    if (!findInvoice) {
      return null;
    }

    return this.prisma.invoiceOrganization.update({
      where: {
        id: invoiceOrganizationId,
      },
      data: {
        value: invoiceOrganizationDto.value,
        paidDay: invoiceOrganizationDto.paidDay,
      },
    });
  }
}
