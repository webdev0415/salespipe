import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SignupToken } from './entities/signup-token.entity';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignupTokenService {
  constructor(
    @InjectRepository(SignupToken)
    private signupTokenRepository: Repository<SignupToken>,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async create(userId: string) {
    const token = await this.signupTokenRepository.save(
      this.signupTokenRepository.create({
        expiryDate: moment()
          .add(this.configService.get('auth.signup.expiresIn'), 'hours')
          .toDate(),
        user: {
          id: userId,
        },
      }),
    );

    return token;
  }

  async updateByUserId(userId: string, dto: Partial<SignupToken>) {
    const token = await this.signupTokenRepository.findOneOrFail({ userId });
    return this.signupTokenRepository.update(token.id, dto);
  }

  async findByUserId(userId: string) {
    return this.signupTokenRepository.findOneOrFail({
      userId,
    });
  }

  async verify(code: string) {
    const token = await this.signupTokenRepository.findOne({ code });
    if (!token) {
      throw new NotFoundException('Signup token not found');
    } else if (token.expiryDate < new Date()) {
      throw new BadRequestException('Signup token expired');
    } else {
      await this.signupTokenRepository.delete(token.id);
      return this.usersService.setActive(token.user.id);
    }
  }
}
