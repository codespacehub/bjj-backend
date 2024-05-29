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
  class_limit: number;

  @IsNumber()
  @IsNotEmpty()
  plan_period: number;

  @IsString()
  @IsOptional()
  description: string;
}
