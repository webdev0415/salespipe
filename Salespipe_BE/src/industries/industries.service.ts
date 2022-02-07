import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { Industry } from './entities/industry.entity';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(Industry)
    private repo: Repository<Industry>,
  ) {}

  create(createIndustryDto: CreateIndustryDto) {
    return this.repo.save(this.repo.create(createIndustryDto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateIndustryDto: UpdateIndustryDto) {
    const result = await this.repo.update(id, updateIndustryDto);
    if (!result || !result.affected) {
      throw new EntityNotFoundError(Industry, id);
    }
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (!result || !result.affected) {
      throw new EntityNotFoundError(Industry, id);
    }
  }
}
