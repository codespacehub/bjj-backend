import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModalityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
