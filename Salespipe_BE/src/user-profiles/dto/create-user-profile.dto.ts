import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UserType } from 'src/users/entities/user.entity';

export class Id {
  @IsUUID()
  id: string;
}

export class CreateUserProfileDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  linkedIn?: string;

  @IsString()
  phone: string;

  @IsString()
  country: string;

  @IsString()
  languages: string;

  @IsString()
  yose: string;

  @ValidateNested({ each: true })
  @Type(() => Id)
  @IsDefined()
  industries: Id[];

  @IsString()
  saleChannels?: string;

  @IsString()
  saleSkills?: string;

  @IsString()
  saleTools?: string;

  @IsString()
  headline: string;

  @IsString()
  bio: string;

  @IsString()
  rate: string;

  @IsString()
  workHistory?: string;

  @IsInt()
  hoursPerWeek: number;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  video?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  expression?: string;

  @IsEnum(UserType)
  type: UserType.SDR;
}
