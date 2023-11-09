import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAndUpdateGraduationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color_degree: string;
}
