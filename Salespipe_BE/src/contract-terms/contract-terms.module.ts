import { Module } from '@nestjs/common';
import { ContractTermsService } from './contract-terms.service';
import { ContractTermsController } from './contract-terms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractTerm } from './entities/contract-term.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractTerm])],
  controllers: [ContractTermsController],
  providers: [ContractTermsService],
})
export class ContractTermsModule {}
