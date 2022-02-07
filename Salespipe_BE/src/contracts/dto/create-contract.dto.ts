import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateContractTermDto } from 'src/contract-terms/dto/create-contract-term.dto';

export class Id {
  @IsUUID()
  id: string;
}

class CreateContractTermNestedDto extends OmitType(CreateContractTermDto, [
  'contract',
]) {}

export class CreateContractDto {
  @IsString()
  @IsOptional()
  hirer: string;

  @IsString()
  @IsDefined()
  hiree: string;

  @IsEmail()
  @IsOptional()
  hirerEmail: string;

  @IsEmail()
  @IsOptional()
  hireeEmail: string;

  @ValidateNested({ each: true })
  @Type(() => CreateContractTermNestedDto)
  terms: CreateContractTermNestedDto[];

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate: Date;
}
