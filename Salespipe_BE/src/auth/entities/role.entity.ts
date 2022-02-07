import { Base } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('roles')
export class Role extends Base {
  @Column({
    unique: true,
  })
  code: string;

  @Column()
  name: string;
}
