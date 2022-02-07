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
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Actions, Resources } from 'src/shared/constant';
import {
  ApiPageResponse,
  createPageResponse,
  PageQuery,
} from 'src/shared/paging';
import { User } from 'src/users/entities/user.entity';
import { ContractsService } from './contracts.service';
import { CreateContractDto, Id } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@ApiTags('contracts')
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.CREATE,
    possession: 'own',
  })
  @Post()
  create(
    @Body() createContractDto: CreateContractDto,
    @CurrentUser() user: User,
  ) {
    if (!user.id) {
      throw new HttpException('Hirer must be current user', 400);
    }
    createContractDto.hirerEmail = user.email;
    createContractDto.hirer = user.id;

    return this.contractsService.create(createContractDto);
  }

  @ApiPageResponse(Contract)
  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.READ,
    possession: 'any',
  })
  @Get()
  async findAll(@Query() query: PageQuery) {
    const result = await this.contractsService.findAll(query);
    return createPageResponse(query, result);
  }

  @ApiPageResponse(Contract)
  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.READ,
    possession: 'own',
  })
  @Get('my')
  async getMyContracts(@Query() query: PageQuery, @CurrentUser() user: User) {
    const result = await this.contractsService.findAll({
      ...query,
      where: { hirerId: user.id },
    });

    return createPageResponse(query, result);
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.READ,
    possession: 'any',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id);
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @CurrentUser() user: User,
  ) {
    const contract = await this.contractsService.findOne(id);
    if (!contract || contract.hirer.id !== user.id) {
      throw new NotFoundException('Contract not found');
    }

    return this.contractsService.update(id, updateContractDto);
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.DELETE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    const contract = await this.contractsService.findOne(id);
    if (!contract || !contract.hirer || contract.hirer.id !== user.id) {
      throw new NotFoundException('Contract not found');
    }

    return this.contractsService.remove(id);
  }
}
