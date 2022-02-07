import { Test, TestingModule } from '@nestjs/testing';
import { EmailAuthService } from './email-auth.service';

describe('EmailAuthService', () => {
  let service: EmailAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailAuthService],
    }).compile();

    service = module.get<EmailAuthService>(EmailAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
