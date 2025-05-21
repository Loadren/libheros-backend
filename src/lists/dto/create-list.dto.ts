import { IsNotEmpty, Length } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @Length(1, 100)
  name: string;
}
