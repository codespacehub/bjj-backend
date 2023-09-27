import { PrismaOrganizationRepository } from 'src/infra/database/prisma/repositories/PrismaOrganizationRepository';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';
import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { randomUUID } from 'crypto';

interface OrganizationProps {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  domain: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class Organization {
  private _id: string;
  private props: OrganizationProps;

  constructor(
    props: Replace<
      OrganizationProps,
      {
        created_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? removeCharacterString({ value: randomUUID() });
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    };
  }

  // Get id value or generate
  public get id(): string {
    return this._id;
  }

  // Set name value
  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public get cnpj(): string {
    return this.props.cnpj;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set domain(domain: string) {
    this.props.domain = domain;
  }

  public get domain(): string {
    return this.props.domain;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}

export const OrganizationRepositoryProvider = {
  provide: 'IOrganizationRepository',
  useClass: PrismaOrganizationRepository,
};
