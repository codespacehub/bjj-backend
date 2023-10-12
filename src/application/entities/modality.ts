import { PrismaOrganizationRepository } from 'src/infra/database/prisma/repositories/PrismaOrganizationRepository';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';
import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { randomUUID } from 'crypto';
import { PrismaModalityRepository } from '@/infra/database/prisma/repositories/PrismaModalityRepository';

interface ModalityProps {
  name: string;
  description: string;

  organization: string;

  updated_at?: Date;
  created_at: Date;
}

@Injectable()
export class Modality {
  private _id: string;
  private props: ModalityProps;

  constructor(
    props: Replace<
      ModalityProps,
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

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
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

export const ModalityRepositoryProvider = {
  provide: 'IModalityRepository',
  useClass: PrismaModalityRepository,
};
