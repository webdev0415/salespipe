import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/entities/role.entity';
import { Base } from 'src/core/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

export enum UserType {
  SDR = 'SDR',
  HIRER = 'HIRER',
  SYSTEM = 'SYSTEM',
}
@Entity('users')
export class User extends Base {
  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Role, {
    eager: true,
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    default: false,
  })
  isActive: boolean;
}
