import { Test, TestingModule } from '@nestjs/testing';
import { IndustriesService } from './industries.service';

describe('IndustriesService', () => {
  let service: IndustriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndustriesService],
    }).compile();

    service = module.get<IndustriesService>(IndustriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
