import { PartialType } from '@nestjs/swagger';
import { CreateContractTermDto } from './create-contract-term.dto';

export class UpdateContractTermDto extends PartialType(CreateContractTermDto) {}
