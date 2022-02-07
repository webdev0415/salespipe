import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyProfilesService } from 'src/company-profiles/company-profiles.service';
import { EmailAuthService } from 'src/email/email-auth.service';
import { createMysqlQuery, FindQuery } from 'src/shared/paging';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract) private repo: Repository<Contract>,
    @Inject(EmailAuthService) private emailAuthService: EmailAuthService,
    @Inject(CompanyProfilesService)
    private companyProfileService: CompanyProfilesService,
    @Inject(UserProfilesService)
    private userProfileService: UserProfilesService,
  ) {}

  async create(createContractDto: CreateContractDto) {
    const { hiree, hirer, hireeEmail, hirerEmail } = createContractDto;
    const x = this.repo.create({
      hireeId: hiree,
      hirerId: hirer,
    });
    const contract = await this.repo.save(x);
    const companyProfile = await this.companyProfileService.findByUserId(hirer);
    const userProfile = await this.userProfileService.findByUserId(hiree);
    this.emailAuthService.newContractDTORequest({
      hireeEmail,
      hirerEmail,
      hireeId: hiree,
      hirerId: hirer,
      hirerName: companyProfile.firstName + ' ' + companyProfile.lastName,
      hireeName: userProfile.firstName + ' ' + userProfile.lastName,
      hirerPhone: companyProfile.phone,
      hireePhone: userProfile.phone,
    });
    return contract;
  }

  findAll(query: FindQuery<{ hirerId: string }>) {
    return this.repo.find(createMysqlQuery(query));
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    return this.repo.update(id, updateContractDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
