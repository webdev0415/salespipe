import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createMysqlQuery, FindQuery } from 'src/shared/paging';
import { Repository } from 'typeorm';
import { CreateContractTermDto } from './dto/create-contract-term.dto';
import { UpdateContractTermDto } from './dto/update-contract-term.dto';
import { ContractTerm } from './entities/contract-term.entity';

@Injectable()
export class ContractTermsService {
  constructor(
    @InjectRepository(ContractTerm) private repo: Repository<ContractTerm>,
  ) {}

  create(createContractTermDto: CreateContractTermDto) {
    return this.repo.save(this.repo.create(createContractTermDto));
  }

  findAll(query: FindQuery<{ contractId: string }>) {
    return this.repo.find(createMysqlQuery(query));
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateContractTermDto: UpdateContractTermDto) {
    return this.repo.update(id, updateContractTermDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
