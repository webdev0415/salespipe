import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/entities/role.entity';
import { createMysqlQuery, FindQuery } from 'src/shared/paging';
import { User, UserType } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { CompanyProfile } from './entities/company-profile.entity';

@Injectable()
export class CompanyProfilesService {
  constructor(
    @InjectRepository(CompanyProfile)
    private repo: Repository<CompanyProfile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createCompanyProfileDto: CreateCompanyProfileDto) {
    const profile = await this.findByUserId(createCompanyProfileDto.userId);
    if (profile) {
      throw new HttpException(
        `Profile already exist for ${createCompanyProfileDto.userId}`,
        400,
      );
    }
    if (createCompanyProfileDto.type === UserType.HIRER) {
      const role = await this.rolesRepository.findOneOrFail({ code: 'HIRER' });
      const user = await this.usersRepository.findOneOrFail({
        id: createCompanyProfileDto.userId,
      });
      user.roles = [role];
      await this.usersRepository.save(user);
    }

    return this.repo.save(createCompanyProfileDto);
  }

  findAll(query: FindQuery<null>) {
    return this.repo.find(createMysqlQuery(query));
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async findByUserId(userId: string) {
    const profiles = await this.repo.find({
      where: {
        userId,
      },
    });

    return profiles ? profiles[0] : null;
  }

  async update(id: string, updateCompanyProfileDto: UpdateCompanyProfileDto) {
    const profile = await this.findOne(id);
    if (!profile) {
      throw new NotFoundException(`Profile ${id} not found`);
    }
    return this.repo.update(id, updateCompanyProfileDto);
  }

  async updateByUserId(
    userId: string,
    updateCompanyProfileDto: UpdateCompanyProfileDto,
  ) {
    const profile = await this.findByUserId(userId);
    if (profile) {
      return this.repo.update(profile.id, updateCompanyProfileDto);
    } else {
      throw new NotFoundException(`Profile not found for ${userId}`);
    }
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    if (!profile) {
      throw new NotFoundException(`Profile ${id} not found`);
    }

    return this.repo.delete(id);
  }
}
