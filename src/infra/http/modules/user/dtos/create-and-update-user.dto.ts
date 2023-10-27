import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAndUpdateUserDto {
  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "plano" do usuário',
  })
  plan: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "cargo" do usuário',
  })
  role: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "cor de graduação" do usuário',
  })
  color_graduation: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "graduação" do usuário',
  })
  graduation: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "modalidade" do usuário',
  })
  modality?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "cpf" do usuário',
  })
  cpf: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "data de nascimento" do usuário',
  })
  birth_date: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "telefone" do usuário',
  })
  phone: string;

  password?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "nome" do usuário',
  })
  name: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "e-mail" do usuário',
  })
  email: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "organização" do usuário',
  })
  organization: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "uf" do usuário',
  })
  uf: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "cep" do usuário',
  })
  cep: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "cidade" do usuário',
  })
  city: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "grau" do usuário',
  })
  degree: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "rua do usuário',
  })
  street: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "bairro" do usuário',
  })
  district: string;

  @IsNumber()
  @IsNotEmpty({
    message:
      'Por favor preencha o campo de "aulas que o aluno já realizou" do usuário',
  })
  amount_class: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "dia de pagamento" do usuário',
  })
  payday: number;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({
    message: 'Por favor preencha o campo de "Número" do usuário',
  })
  house_number: string;
}
