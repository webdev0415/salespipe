import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(
  OmitType(CreateContractDto, ['hirer', 'hiree', 'terms']),
) {}
