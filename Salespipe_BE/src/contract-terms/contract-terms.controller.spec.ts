import { Test, TestingModule } from '@nestjs/testing';
import { ContractTermsController } from './contract-terms.controller';
import { ContractTermsService } from './contract-terms.service';

describe('ContractTermsController', () => {
  let controller: ContractTermsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractTermsController],
      providers: [ContractTermsService],
    }).compile();

    controller = module.get<ContractTermsController>(ContractTermsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
