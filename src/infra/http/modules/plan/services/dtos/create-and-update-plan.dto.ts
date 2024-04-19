import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAndUpdatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsOptional()
  description: string;
}
