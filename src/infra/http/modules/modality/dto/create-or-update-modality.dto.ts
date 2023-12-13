import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateModalityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
