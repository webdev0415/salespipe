import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class Id {
  @IsUUID()
  id: string;
}

export class CreateContractTermDto {
  @Type(() => Id)
  contract: Id;

  @IsNumber()
  rate: number;

  @IsNumber()
  hoursPerWeek: number;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
