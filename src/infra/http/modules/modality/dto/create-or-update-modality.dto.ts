import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateModalityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
