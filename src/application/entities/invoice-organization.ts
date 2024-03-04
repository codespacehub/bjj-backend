import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';

import { removeCharacterString } from '@/shared/utils/remove-character-string';
import { PrismaInvoiceOrganizationRepository } from '@/infra/database/prisma/repositories/PrismaInvoiceOrganizationRepository';

interface InvoiceOrganizationProps {
  value: number;
  paidDay: string;
  paidOut: boolean;
  organization_id?: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class InvoiceOrganization {
  private _id: string;
  private props: InvoiceOrganizationProps;

  constructor(
    props: Replace<
      InvoiceOrganizationProps,
      {
        created_at?: Date;
        paidOut?: boolean;
        organization_id?: string;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? removeCharacterString({ value: randomUUID() });
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      paidOut: props.paidOut ?? false,
      organization_id: props.organization_id ?? null,
    };
  }

  public get id(): string {
    return this._id;
  }

  public set paidDay(paidDay: string) {
    this.props.paidDay = paidDay;
  }

  public get paidDay(): String {
    return this.props.paidDay;
  }

  public set organization_id(organization_id: string) {
    this.props.organization_id = organization_id;
  }

  public get organization_id(): string {
    return this.props.organization_id;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get value(): number {
    return this.props.value;
  }

  public get paidOut(): boolean {
    return this.props.paidOut;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}

export const InvoiceOrganizationRepositoryProvider = {
  provide: 'IInvoiceOrganizationRepository',
  useClass: PrismaInvoiceOrganizationRepository,
};
