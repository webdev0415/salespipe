import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { IndustriesController } from './industries.controller';
import { Industry } from './entities/industry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Industry])],
  controllers: [IndustriesController],
  providers: [IndustriesService],
})
export class IndustriesModule {}
