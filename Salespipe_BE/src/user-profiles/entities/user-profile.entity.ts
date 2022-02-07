import { Base } from 'src/core/base.entity';
import { Industry } from 'src/industries/entities/industry.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity('user_profiles')
export class UserProfile extends Base {
  @Column()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    default: true,
  })
  isAvailable: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  linkedIn?: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column()
  languages: string;

  @Column()
  yose: string;

  @ManyToMany(() => Industry, {
    eager: true,
  })
  @JoinTable({
    name: 'user_profiles_industries',
    joinColumn: {
      name: 'user_profile_id',
    },
    inverseJoinColumn: {
      name: 'industry_id',
    },
  })
  industries: Industry[];

  @Column({
    nullable: true,
  })
  saleChannels?: string;

  @Column({
    nullable: true,
  })
  saleSkills?: string;

  @Column({
    nullable: true,
  })
  saleTools?: string;

  @Column()
  headline: string;

  @Column({
    length: 1023,
  })
  bio: string;

  @Column()
  rate: string;

  @Column({
    nullable: true,
    length: 1023,
  })
  workHistory?: string;

  @Column()
  hoursPerWeek: number;

  @Column({
    nullable: true,
  })
  avatar?: string;

  @Column({
    nullable: true,
  })
  video?: string;

  @Column({
    nullable: true,
  })
  age?: number;

  @Column({
    nullable: true,
  })
  gender?: string;

  @Column({
    nullable: true,
  })
  expression?: string;
}
