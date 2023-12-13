import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';

import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { PrismaGraduationRepository } from '@/infra/database/prisma/repositories/PrismaGraduationRepository';

interface GraduationProps {
  name: string;
  modality_id: string;
  amount_class: number;

  order: number;

  organization_id: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class Graduation {
  private _id: string;
  private props: GraduationProps;

  constructor(
    props: Replace<
      GraduationProps,
      {
        organization_id?: string;
        created_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? removeCharacterString({ value: randomUUID() });
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      organization_id: props.organization_id ?? null,
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set amount_class(amount_class: number) {
    this.props.amount_class = amount_class;
  }

  public get amount_class(): number {
    return this.props.amount_class;
  }

  public set order(order: number) {
    this.props.order = order;
  }

  public get order(): number {
    return this.props.order;
  }

  public set modality_id(modality_id: string) {
    this.props.modality_id = modality_id;
  }

  public get modality_id(): string {
    return this.props.modality_id;
  }

  public set organization_id(organization_id: string) {
    this.props.organization_id = organization_id;
  }

  public get organization_id(): string {
    return this.props.organization_id;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}

export const GraduationRepositoryProvider = {
  provide: 'IGraduationRepository',
  useClass: PrismaGraduationRepository,
};
