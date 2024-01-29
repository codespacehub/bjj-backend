import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAndUpdateInvoiceDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Por favor preencha o campo de valor do pagamento' })
  value: number;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({ message: 'Por favor preencha o campo do dia de pagamento' })
  paidDay: string;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({ message: 'Por favor preencha o campo de aluno' })
  user_id: string;
}
