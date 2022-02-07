import { Base } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('signup_prepare_tokens')
export class SignupPrepareToken extends Base {
  @Column({
    unique: true,
    type: 'uuid',
    generated: 'uuid',
  })
  code: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  expiryDate: Date;
}
