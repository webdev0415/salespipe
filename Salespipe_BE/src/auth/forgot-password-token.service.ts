import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordToken } from './entities/forgot-password-token.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class ForgotPasswordTokenService {
  constructor(
    @InjectRepository(ForgotPasswordToken)
    private forgotPasswordTokenRepository: Repository<ForgotPasswordToken>,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async create(userId: string) {
    await this.forgotPasswordTokenRepository.delete({
      userId,
    });

    const token = await this.forgotPasswordTokenRepository.save(
      this.forgotPasswordTokenRepository.create({
        expiryDate: moment()
          .add(this.configService.get('auth.forgotPassword.expiresIn'), 'hours')
          .toDate(),
        user: {
          id: userId,
        },
      }),
    );

    return token;
  }

  async updateByUserId(userId: string, dto: Partial<ForgotPasswordToken>) {
    const token = await this.forgotPasswordTokenRepository.findOneOrFail({
      userId,
    });
    return this.forgotPasswordTokenRepository.update(token.id, dto);
  }

  async findByUserId(userId: string) {
    return this.forgotPasswordTokenRepository.findOneOrFail({
      userId,
    });
  }

  async changePassword(dto: ForgotPasswordDto) {
    const token = await this.forgotPasswordTokenRepository.findOne({
      code: dto.code,
    });
    if (!token || token.user.email !== dto.email) {
      throw new NotFoundException('Forgot password token not found');
    } else if (token.expiryDate < new Date()) {
      throw new BadRequestException('Forgot password token expired');
    } else {
      await this.forgotPasswordTokenRepository.delete(token.id);
      return this.usersService.updatePassword(token.user.id, {
        password: dto.password,
      });
    }
  }
}
