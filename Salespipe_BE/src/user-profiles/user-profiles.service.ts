import { HttpException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/entities/role.entity';
import { createMysqlQuery, FindQuery } from 'src/shared/paging';
import { User, UserType } from 'src/users/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private repo: Repository<UserProfile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  // because of this: https://github.com/typeorm/typeorm/issues/2200
  // we need to use find instead
  async findByUserId(id: string): Promise<UserProfile> {
    const profile = await this.repo.findOne({
      where: {
        userId: id,
      },
    });
    return profile;
  }

  async create(createUserProfileDto: CreateUserProfileDto) {
    const profile = await this.findByUserId(createUserProfileDto.userId);

    if (profile) {
      throw new HttpException(
        `Profile already exist for ${createUserProfileDto.userId}`,
        400,
      );
    }
    if (
      createUserProfileDto.type === UserType.SDR &&
      createUserProfileDto.userId
    ) {
      const role = await this.rolesRepository.findOneOrFail({ code: 'SDR' });
      const user = await this.usersRepository.findOneOrFail({
        id: createUserProfileDto.userId,
      });
      user.roles = [role];
      await this.usersRepository.save(user);
    }

    return this.repo.save(this.repo.create(createUserProfileDto));
  }

  async updateVerified(userId: string, verified: boolean) {
    const profile = await this.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException(`Profile ${userId} not found`);
    }
    return await this.repo.update(profile.id, { isVerified: verified });
  }

  async findAllAvailable(query: FindQuery<Pick<UserProfile, 'isAvailable'>>) {
    const newQuery: any = { ...query };
    newQuery.where = [
      { ...query.where, firstName: ILike(`%${query.s}%`) },
      { ...query.where, lastName: ILike(`%${query.s}%`) },
      { ...query.where, saleSkills: ILike(`%${query.s}%`) },
      { ...query.where, saleTools: ILike(`%${query.s}%`) },
    ];

    const users = await this.repo.find(createMysqlQuery(newQuery));
    return users;
  }

  async findAllVerified(query: FindQuery<Pick<UserProfile, 'isVerified'>>) {
    const newQuery: any = { ...query };
    newQuery.where = [
      { ...query.where, firstName: ILike(`%${query.s}%`) },
      { ...query.where, lastName: ILike(`%${query.s}%`) },
      { ...query.where, saleSkills: ILike(`%${query.s}%`) },
      { ...query.where, saleTools: ILike(`%${query.s}%`) },
    ];

    const users = await this.repo.find(createMysqlQuery(newQuery));
    return users;
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    const userProfile = await this.findOne(id);
    if (userProfile) {
      return this.repo.save({ ...userProfile, ...updateUserProfileDto });
    } else {
      throw new NotFoundException(`User profile userId = ${id} not found`);
    }
  }

  async verifiedProfile(id: string) {
    const userProfile = await this.findOne(id);
    if (userProfile) {
      return this.repo.update(id, { isVerified: true });
    } else {
      throw new NotFoundException(`User profile ${id} not found`);
    }
  }

  async setAvailableByUser(userId: string, isAvailable: boolean) {
    const userProfile = await this.repo.findOne({
      where: {
        userId,
      },
    });
    if (userProfile) {
      return this.repo.update(userProfile.id, { isAvailable: isAvailable });
    } else {
      throw new NotFoundException(`User profile for user ${userId} not found`);
    }
  }

  async updateByUserId(
    userId: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const userProfile = await this.findByUserId(userId);
    if (userProfile) {
      return this.repo.save({ ...userProfile, ...updateUserProfileDto });
    } else {
      throw new NotFoundException(`User profile for user ${userId} not found`);
    }
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
