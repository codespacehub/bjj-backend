import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePresenceDto {
  @IsDateString()
  @IsNotEmpty()
  day: Date;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  time_id: string;

  @IsString()
  @IsNotEmpty()
  modality_id: string;
}
