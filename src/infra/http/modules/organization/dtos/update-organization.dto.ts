import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateOrganizationDto {
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

  @IsNumber()
  @IsNotEmpty({
    message: 'Por favor preencha o campo de mensalidade da organização',
  })
  payment_value: number;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  payment_method_value: string;
}
