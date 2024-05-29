import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAndUpdateUserDto {
  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  id?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  plan_id?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  role?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  modality_id?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  cpf?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  birth_date?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  phone?: string;

  password?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  graduation_id?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  uf?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  cep?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  city?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  street?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  district?: string;

  @IsNumber()
  @IsOptional()
  amount_class?: number;

  @IsNumber()
  @IsOptional()
  payday?: number;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  house_number?: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsOptional()
  photo_url?: string;

  @IsBoolean()
  @IsOptional()
  invoicesPaid?: boolean
}
