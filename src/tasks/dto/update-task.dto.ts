import {
  IsOptional,
  IsDateString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @MaxLength(255)
  shortDesc?: string;

  @IsOptional()
  longDesc?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
