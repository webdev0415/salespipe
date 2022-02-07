import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Actions, Resources } from 'src/shared/constant';
import {
  ApiPageResponse,
  createPageResponse,
  PageResponse,
  SearchQuery,
} from 'src/shared/paging';
import { User } from 'src/users/entities/user.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateAvailableUserProfileDto } from './dto/update-available-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateVerifiedUserProfileDto } from './dto/update-verified-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfilesService } from './user-profiles.service';
@ApiTags('UserProfiles')
@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.CREATE,
    possession: 'any',
  })
  @Post('admin')
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfilesService.create(createUserProfileDto);
  }

  @Post('my')
  createMyProfile(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @CurrentUser() user: User,
  ) {
    return this.userProfilesService.create({
      userId: user.id,
      ...createUserProfileDto,
    });
  }

  @ApiPageResponse(UserProfile)
  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get('available')
  async findAll(
    @Query() query: SearchQuery,
  ): Promise<PageResponse<UserProfile>> {
    const result = await this.userProfilesService.findAllAvailable({
      ...query,
      where: {
        isAvailable: true,
      },
    });

    return createPageResponse(query, result);
  }

  @ApiPageResponse(UserProfile)
  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get('verified')
  async findAllVerified(
    @Query() query: SearchQuery,
  ): Promise<PageResponse<UserProfile>> {
    const result = await this.userProfilesService.findAllVerified({
      ...query,
      where: {
        isVerified: true,
      },
    });

    return createPageResponse(query, result);
  }

  @SerializeOptions({
    groups: ['owner'],
  })
  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'own',
  })
  @Get('my')
  getMyProfile(@CurrentUser() user: User) {
    return this.userProfilesService.findByUserId(user.id);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userProfilesService.findOne(id);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get('user/:id')
  async findOneByUserId(@Param('id') id: string) {
    return await this.userProfilesService.findByUserId(id);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('my')
  updateMyProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @CurrentUser() user: User,
  ) {
    return this.userProfilesService.updateByUserId(
      user.id,
      updateUserProfileDto,
    );
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('my/status')
  setAvailable(
    @CurrentUser() user: User,
    @Body() dto: UpdateAvailableUserProfileDto,
  ) {
    return this.userProfilesService.setAvailableByUser(
      user.id,
      dto.isAvailable,
    );
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return await this.userProfilesService.update(id, updateUserProfileDto);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.DELETE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfilesService.remove(id);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @Post('verified')
  async updateVerified(@Body() dto: UpdateVerifiedUserProfileDto) {
    return await this.userProfilesService.updateVerified(
      dto.userId,
      dto.isVerified,
    );
  }
}
