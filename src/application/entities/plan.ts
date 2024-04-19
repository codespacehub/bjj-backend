import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';

import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { PrismaGraduationRepository } from '@/infra/database/prisma/repositories/PrismaGraduationRepository';
import { PrismaPlanRepository } from '@/infra/database/prisma/repositories/PrismaPlanRepository';

interface PlanProps {
  name: string;
  value: number;
  limit: number;
  description: string;

  organization_id: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class Plan {
  private _id: string;
  private props: PlanProps;

  constructor(
    props: Replace<
      PlanProps,
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

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get value(): number {
    return this.props.value;
  }

  public set limit(limit: number) {
    this.props.limit = limit;
  }

  public get limit(): number {
    return this.props.limit;
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

export const PlanRepositoryProvider = {
  provide: 'IPlanRepository',
  useClass: PrismaPlanRepository,
};
