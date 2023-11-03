import { Injectable } from '@nestjs/common';
import { Replace } from '../helpers/Replace';
import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { randomUUID } from 'crypto';
import { PrismaTeacherRepository } from '@/infra/database/prisma/repositories/PrismaTeacherRepository';

interface TeacherProps {
  cpf: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string;

  active: boolean;
  password: string;
  verified: boolean;

  uf: string;
  cep: string;
  city: string;
  street: string;
  district: string;
  house_number: string;

  modality: string;
  organization: string;

  created_at: Date;
  updated_at?: Date;
}

@Injectable()
export class Teacher {
  private _id: string;
  private props: TeacherProps;

  constructor(
    props: Replace<
      TeacherProps,
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

  public get verified(): boolean {
    return this.props.verified;
  }

  public get active(): boolean {
    return this.props.active;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}

export const TeacherRepositoryProvider = {
  provide: 'ITeacherRepository',
  useClass: PrismaTeacherRepository,
};
