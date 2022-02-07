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
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { Actions, Resources } from 'src/shared/constant';
import { createPageResponse, PageQuery } from 'src/shared/paging';
import { ContractTermsService } from './contract-terms.service';
import { CreateContractTermDto } from './dto/create-contract-term.dto';
import { UpdateContractTermDto } from './dto/update-contract-term.dto';

@ApiTags('Contract-terms')
@Controller('contracts/:contractId/terms')
export class ContractTermsController {
  constructor(private readonly contractTermsService: ContractTermsService) {}

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.CREATE,
    possession: 'own',
  })
  @Post()
  create(
    @Param('contractId') contractId: string,
    @Body() createContractTermDto: CreateContractTermDto,
  ) {
    return this.contractTermsService.create({
      contract: {
        id: contractId,
      },
      ...createContractTermDto,
    });
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.READ,
    possession: 'own',
  })
  @Get()
  async findAll(
    @Param('contractId') contractId: string,
    @Query() query: PageQuery,
  ) {
    const result = await this.contractTermsService.findAll({
      ...query,
      where: {
        contractId,
      },
    });

    return createPageResponse(query, result);
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.READ,
    possession: 'own',
  })
  @Get(':id')
  async findOne(
    @Param('contractId') contractId: string,
    @Param('id') id: string,
  ) {
    const contractTerm = await this.contractTermsService.findOne(id);
    if (!contractTerm || contractTerm.contractId !== contractId) {
      throw new NotFoundException('Contract term not found');
    }

    return this.contractTermsService.findOne(id);
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('contractId') contractId: string,
    @Param('id') id: string,
    @Body() updateContractTermDto: UpdateContractTermDto,
  ) {
    const contractTerm = await this.contractTermsService.findOne(id);
    if (!contractTerm || contractTerm.contractId !== contractId) {
      throw new NotFoundException('Contract term not found');
    }

    return this.contractTermsService.update(id, updateContractTermDto);
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.DELETE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('contractId') contractId: string,
    @Param('id') id: string,
  ) {
    const contractTerm = await this.contractTermsService.findOne(id);
    if (!contractTerm || contractTerm.contractId !== contractId) {
      throw new NotFoundException('Contract term not found');
    }

    return this.contractTermsService.remove(id);
  }
}
