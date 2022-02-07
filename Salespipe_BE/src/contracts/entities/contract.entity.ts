import { ContractTerm } from 'src/contract-terms/entities/contract-term.entity';
import { Base } from 'src/core/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum ContractStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL',
  EFFECTING = 'EFFECTING',
  ENDED = 'ENDED',
}
@Entity()
export class Contract extends Base {
  @Column()
  hirerId: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  hirer: User;

  @Column()
  hireeId: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  hiree: User;

  @OneToMany(() => ContractTerm, (term) => term.contract, {
    cascade: ['insert', 'remove'],
    eager: true,
  })
  terms: ContractTerm[];

  @Column({
    type: 'enum',
    enum: ContractStatus,
  })
  status: ContractStatus;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
