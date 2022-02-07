import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

const HASH_ROUND = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: Partial<User>): Promise<User> {
    // dto.password = await hash(dto.password, HASH_ROUND);
    return this.usersRepository.save(this.usersRepository.create(dto));
  }

  async updatePassword(id: string, dto: Partial<User>): Promise<void> {
    const user = await this.usersRepository.findOneOrFail(id);
    const hashPassword = await hash(dto.password, HASH_ROUND);
    user.password = hashPassword;
    user.roles = dto.roles;
    await this.usersRepository.save(user);
  }

  async update(
    id: string,
    dto: Partial<Omit<User, 'password'>>,
  ): Promise<void> {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.update(id, dto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      email,
    });
  }

  async findByEmailWithoutFail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email,
    });
  }

  async setActive(id: string): Promise<void> {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.update(id, { isActive: true });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
  }
}
