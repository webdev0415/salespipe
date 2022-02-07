import { Base } from 'src/core/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

export enum Time {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  BOTH = 'BOTH',
}
@Entity('company_profiles')
export class CompanyProfile extends Base {
  @Column({
    name: 'user_id',
  })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  company: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  linkedIn?: string;

  @Column({
    nullable: true,
  })
  website?: string;

  @Column({
    nullable: true,
  })
  phone?: string;

  @Column({
    nullable: true,
  })
  position?: string;

  @Column({
    type: 'enum',
    enum: Time,
    nullable: true,
  })
  time?: Time;

  @Column({
    nullable: true,
  })
  headCount?: string;

  @Column({
    nullable: true,
  })
  saleTools?: string;

  @Column({
    nullable: true,
  })
  targetCustomer?: string;

  @Column({
    nullable: true,
  })
  teamSize?: string;

  @Column({
    nullable: true,
  })
  avatar?: string;

  @Column({
    nullable: true,
  })
  headline?: string;

  @Column({
    length: 1023,
    nullable: true,
  })
  description?: string;
}
