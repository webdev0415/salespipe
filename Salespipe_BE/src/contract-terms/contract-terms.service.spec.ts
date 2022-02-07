import { Test, TestingModule } from '@nestjs/testing';
import { ContractTermsService } from './contract-terms.service';

describe('ContractTermsService', () => {
  let service: ContractTermsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractTermsService],
    }).compile();

    service = module.get<ContractTermsService>(ContractTermsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
