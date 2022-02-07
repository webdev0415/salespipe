import { IsString } from 'class-validator';

export class CreateIndustryDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
