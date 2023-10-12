import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

class OrganizationInfo {
  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({ message: 'Por favor preencha o campo de nome da organização' })
  name: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({ message: 'Por favor preencha o campo de cnpj da organização' })
  cnpj: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de e-mail da organização',
  })
  email: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de telefone da organização',
  })
  phone: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de domínio da organização',
  })
  domain: string;
}

class OrganizationMaster {
  payday: number;

  total_class: number;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de plano do usuário',
  })
  plan: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de graduação do usuário',
  })
  graduation: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de cor de graduação do usuário',
  })
  color_graduation: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de modalidade do usuário',
  })
  modality: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de cpf do usuário',
  })
  cpf: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de data de nascimento do usuário',
  })
  birth_date: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de telefone do usuário',
  })
  phone: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de senha do usuário',
  })
  password: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de nome do usuário',
  })
  name: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de e-mail do usuário',
  })
  email: string;
}

export class CreateOrganizationDto {
  @IsBoolean()
  active: boolean;

  organization_info: OrganizationInfo;
  organization_master: OrganizationMaster;
}
