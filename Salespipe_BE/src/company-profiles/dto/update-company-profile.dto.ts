import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCompanyProfileDto } from './create-company-profile.dto';

export class UpdateCompanyProfileDto extends PartialType(
  CreateCompanyProfileDto,
) {}

export class UpdateMyCompanyProfileDto extends OmitType(
  UpdateCompanyProfileDto,
  ['userId'],
) {}
