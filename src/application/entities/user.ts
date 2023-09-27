import { removeCharacterString } from 'src/shared/utils/remove-character-string';
import { Replace } from '../helpers/Replace';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

interface UserProps {
  name: string;
  email: string;
  password: string;
  role: string;

  cpf: string;
  phone: string;
  birthDate: string;
  total_class: string;

  address: {
    cep: string;
    state: string;
    city: string;
    street: string;
    number: string;
    district: string;
  };

  graduation: string;
  color_graduation: string;

  plano: string;
  payday: string;

  modality: string;
  organization: string;

  updatedAt: Date;
  createdAt: Date;
}

@Injectable()
export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; updateAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? removeCharacterString({ value: randomUUID() });
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
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

  public get birthDate(): string {
    return this.props.birthDate;
  }

  public set birthDate(birthDate: string) {
    this.props.birthDate = birthDate;
  }

  public get total_class(): string {
    return this.props.total_class;
  }

  public set total_class(total_class: string) {
    this.props.total_class = total_class;
  }

  // -- addresses --------------------------------
  public set cep(cep: string) {
    this.props.address.cep = cep;
  }

  public get cep(): string {
    return this.props.address.cep;
  }

  public set state(state: string) {
    this.props.address.state = state;
  }

  public get state(): string {
    return this.props.address.state;
  }

  public set city(city: string) {
    this.props.address.city = city;
  }

  public get city(): string {
    return this.props.address.city;
  }

  public set street(street: string) {
    this.props.address.street = street;
  }

  public get street(): string {
    return this.props.address.street;
  }

  public set number(number: string) {
    this.props.address.number = number;
  }

  public get number(): string {
    return this.props.address.number;
  }

  public set district(district: string) {
    this.props.address.district = district;
  }

  public get district(): string {
    return this.props.address.district;
  }

  // -- addresses --------------------------------

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

  public set plano(plano: string) {
    this.props.plano = plano;
  }

  public get plano(): string {
    return this.props.plano;
  }

  public set payday(payday: string) {
    this.props.payday = payday;
  }

  public get payday(): string {
    return this.props.payday;
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

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
