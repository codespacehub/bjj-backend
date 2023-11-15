import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

import { Replace } from '../helpers/Replace';
import { removeCharacterString } from '@/shared/utils/remove-character-string';
import { PrismaTimeRepository } from '@/infra/database/prisma/repositories/PrismaTimeRepository';

interface TimeProps {
  hour: string;
  modality: string;
  organization: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class Time {
  private _id: string;
  private props: TimeProps;

  constructor(
    props: Replace<
      TimeProps,
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

  public get id(): string {
    return this._id;
  }

  public set hour(hour: string) {
    this.props.hour = hour;
  }

  public get hour(): string {
    return this.props.hour;
  }

  public set modality(modality: string) {
    this.props.modality = modality;
  }

  public get modality(): string {
    return this.props.modality;
  }

  public set organization(organization: string) {
    this.props.organization = organization;
  }

  public get organization(): string {
    return this.props.organization;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}

export const TimeRepositoryProvider = {
  provide: 'ITimeRepository',
  useClass: PrismaTimeRepository,
};
