import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';

import { removeCharacterString } from '@/shared/utils/remove-character-string';
import { PrismaInvoiceRepository } from '@/infra/database/prisma/repositories/PrismaInvoiceRepository';

interface InvoiceProps {
  value: number;
  paidDay: string;
  paidOut: boolean;
  user_id: string;
  organization_id?: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class Invoice {
  private _id: string;
  private props: InvoiceProps;

  constructor(
    props: Replace<
      InvoiceProps,
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

  public set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  public get user_id(): string {
    return this.props.user_id;
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

export const InvoiceRepositoryProvider = {
  provide: 'IInvoiceRepository',
  useClass: PrismaInvoiceRepository,
};
