import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAndUpdateInvoiceOrganizationDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Por favor preencha o campo de valor do pagamento' })
  value: number;

  @IsString({ message: 'Esse campo precisa ser um texto' })
  @IsNotEmpty({ message: 'Por favor preencha o campo do dia de pagamento' })
  paidDay: string;
}
