import { Module } from '@nestjs/common';
import { CompanyProfilesService } from './company-profiles.service';
import { CompanyProfilesController } from './company-profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfile } from './entities/company-profile.entity';
import { Role } from 'src/auth/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyProfile]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [CompanyProfilesController],
  providers: [CompanyProfilesService],
  exports: [CompanyProfilesService],
})
export class CompanyProfilesModule {}
