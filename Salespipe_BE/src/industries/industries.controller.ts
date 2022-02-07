import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';
import { Actions, Resources } from 'src/shared/constant';

@ApiTags('Industries')
@Controller('industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @UseRoles({
    resource: Resources.INDUSTRIES,
    action: Actions.CREATE,
    possession: 'any',
  })
  @Post()
  create(@Body() createIndustryDto: CreateIndustryDto) {
    return this.industriesService.create(createIndustryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.industriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.industriesService.findOne(id);
  }

  @UseRoles({
    resource: Resources.INDUSTRIES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndustryDto: UpdateIndustryDto,
  ) {
    return this.industriesService.update(id, updateIndustryDto);
  }

  @UseRoles({
    resource: Resources.INDUSTRIES,
    action: Actions.DELETE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.industriesService.remove(id);
  }
}
