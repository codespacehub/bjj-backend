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
  degree: number;
  payday: number;
  active: boolean;
  password: string;
  modality?: string;
  verified: boolean;
  birth_date: string;
  graduation: string;
  organization: string;
  amount_class: number;

  uf: string;
  cep: string;
  city: string;
  street: string;
  district: string;
  house_number: string;

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

  public set degree(degree: number) {
    this.props.degree = degree;
  }

  public get degree(): number {
    return this.props.degree;
  }

  public set amount_class(amount_class: number) {
    this.props.amount_class = amount_class;
  }

  public get amount_class(): number {
    return this.props.amount_class;
  }

  public set uf(uf: string) {
    this.props.uf = uf;
  }

  public get uf(): string {
    return this.props.uf;
  }

  public set cep(cep: string) {
    this.props.cep = cep;
  }

  public get cep(): string {
    return this.props.cep;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get city(): string {
    return this.props.city;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get street(): string {
    return this.props.street;
  }

  public set district(district: string) {
    this.props.district = district;
  }

  public get district(): string {
    return this.props.district;
  }

  public set house_number(house_number: string) {
    this.props.house_number = house_number;
  }

  public get house_number(): string {
    return this.props.house_number;
  }

  public set graduation(graduation: string) {
    this.props.graduation = graduation;
  }

  public get graduation(): string {
    return this.props.graduation;
  }

  public set organization(organization: string) {
    this.props.organization = organization;
  }

  public get organization(): string {
    return this.props.organization;
  }

  public set modality(modality: string) {
    this.props.modality = modality;
  }

  public get modality(): string {
    return this.props.modality;
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
