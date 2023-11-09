import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';
import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { randomUUID } from 'crypto';
import { PrismaGraduationRepository } from '@/infra/database/prisma/repositories/PrismaGraduationRepository';

interface GraduationProps {
  name: string;
  color_degree: string;
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

  public set color_degree(color_degree: string) {
    this.props.color_degree = color_degree;
  }

  public get color_degree(): string {
    return this.props.color_degree;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}

export const GraduationRepositoryProvider = {
  provide: 'IGraduationRepository',
  useClass: PrismaGraduationRepository,
};
