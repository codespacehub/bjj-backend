import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';

import { removeCharacterString } from '@/shared/utils/remove-character-string';
import { PrismaPresenceRepository } from '@/infra/database/prisma/repositories/PrismaPresenceRepository';

interface PresenceProps {
  day: Date;
  user_id: string;
  time_id: string;
  modality_id: string;
  confirmation: boolean;
  organization_id: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class Presence {
  private _id: string;
  private props: PresenceProps;

  constructor(
    props: Replace<
      PresenceProps,
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

  public set day(day: Date) {
    this.props.day = day;
  }

  public get day(): Date {
    return this.props.day;
  }

  public set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public set time_id(time_id: string) {
    this.props.time_id = time_id;
  }

  public get time_id(): string {
    return this.props.time_id;
  }

  public set modality_id(modality_id: string) {
    this.props.modality_id = modality_id;
  }

  public get modality_id(): string {
    return this.props.modality_id;
  }

  public set confirmation(confirmation: boolean) {
    this.props.confirmation = confirmation;
  }

  public get confirmation(): boolean {
    return this.props.confirmation;
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

export const PresenceRepositoryProvider = {
  provide: 'IPresenceRepository',
  useClass: PrismaPresenceRepository,
};
