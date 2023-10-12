import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';

import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { PrismaUserRepository } from 'src/infra/database/prisma/repositories/PrismaUserRepository';

interface UserProps {
  cpf: string;
  name: string;
  plan: string;
  role: string;
  email: string;
  phone: string;
  payday: number;
  active: boolean;
  password: string;
  verified: boolean;
  birth_date: string;
  graduation: string;
  total_class: number;
  organization: string;
  color_graduation: string;

  updatedAt?: Date;
  created_at: Date;
}

@Injectable()
export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      {
        active?: boolean;
        verified?: boolean;
        created_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? removeCharacterString({ value: randomUUID() });
    this.props = {
      ...props,
      active: props.active ?? true,
      verified: props.verified ?? false,
      created_at: props.created_at ?? new Date(),
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

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set role(role: string) {
    this.props.role = role;
  }

  public get role(): string {
    return this.props.role;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get birth_date(): string {
    return this.props.birth_date;
  }

  public set birth_date(birth_date: string) {
    this.props.birth_date = birth_date;
  }

  public get total_class(): number {
    return this.props.total_class;
  }

  public set total_class(total_class: number) {
    this.props.total_class = total_class;
  }

  public set graduation(graduation: string) {
    this.props.graduation = graduation;
  }

  public get graduation(): string {
    return this.props.graduation;
  }

  public set color_graduation(color_graduation: string) {
    this.props.color_graduation = color_graduation;
  }

  public get color_graduation(): string {
    return this.props.color_graduation;
  }

  public set plan(plan: string) {
    this.props.plan = plan;
  }

  public get plan(): string {
    return this.props.plan;
  }

  public set payday(payday: number) {
    this.props.payday = payday;
  }

  public get payday(): number {
    return this.props.payday;
  }

  public set organization(organization: string) {
    this.props.organization = organization;
  }

  public get organization(): string {
    return this.props.organization;
  }

  public get verified(): boolean {
    return this.props.verified;
  }

  public get active(): boolean {
    return this.props.active;
  }

  public get created__at(): Date {
    return this.props.created_at;
  }
}

export const UserRepositoryProvider = {
  provide: 'IUserRepository',
  useClass: PrismaUserRepository,
};
