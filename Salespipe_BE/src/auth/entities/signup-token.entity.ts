import { Base } from 'src/core/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('signup_tokens')
export class SignupToken extends Base {
  @Column({
    unique: true,
    type: 'uuid',
    generated: 'uuid',
  })
  code: string;

  @Column()
  userId: string;

  @OneToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column()
  expiryDate: Date;
}
