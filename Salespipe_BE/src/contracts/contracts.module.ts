import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { EmailModule } from 'src/email/email.module';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { CompanyProfilesModule } from 'src/company-profiles/company-profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    EmailModule,
    CompanyProfilesModule,
    UserProfilesModule,
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
