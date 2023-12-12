import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAndUpdateGraduationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  modality_id: string;

  @IsNumber()
  @IsNotEmpty()
  amount_class: number;

  @IsNumber()
  @IsNotEmpty()
  order: number;
}
