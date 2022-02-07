import { Base } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('industries')
export class Industry extends Base {
  @Column({
    unique: true,
  })
  code: string;

  @Column()
  name: string;
}
