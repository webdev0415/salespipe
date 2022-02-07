import { Contract } from 'src/contracts/entities/contract.entity';
import { Base } from 'src/core/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum ContractTermStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL',
  EFFECTING = 'EFFECTING',
  ENDED = 'ENDED',
}
@Entity()
export class ContractTerm extends Base {
  @Column()
  contractId: string;

  @ManyToOne(() => Contract, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  contract: Contract;

  @Column({
    type: 'enum',
    enum: ContractTermStatus,
  })
  status: ContractTermStatus;

  @Column()
  rate: number;

  @Column()
  hoursPerWeek: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
