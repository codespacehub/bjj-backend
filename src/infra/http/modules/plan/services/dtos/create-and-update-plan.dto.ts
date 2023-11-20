import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAndUpdatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
