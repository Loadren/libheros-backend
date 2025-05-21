import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MaxLength(255)
  shortDesc: string;

  @IsOptional()
  longDesc: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
