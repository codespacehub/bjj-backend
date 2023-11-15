import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTimeDto {
  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsString()
  @IsNotEmpty()
  modality: string;
}
