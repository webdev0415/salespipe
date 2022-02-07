import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SignupPrepareToken } from './entities/signup-prepare-token.entity';
import { SignupToken } from './entities/signup-token.entity';

@Injectable()
export class SignupPrepareTokenService {
  constructor(
    @InjectRepository(SignupPrepareToken)
    private signupPrepareTokenRepository: Repository<SignupPrepareToken>,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  // TODO remove expiry tokens
  async create(email: string) {
    let user;
    try {
      user = await this.usersService.findByEmail(email);
    } catch (e) {
      // do nothing
    }
    if (user) throw new HttpException('Email exist', 400);

    const token = await this.signupPrepareTokenRepository.save(
      this.signupPrepareTokenRepository.create({
        expiryDate: moment()
          .add(this.configService.get('auth.signup.expiresIn'), 'hours')
          .toDate(),
        email,
      }),
    );

    return token;
  }

  async updateByEmail(email: string, dto: Partial<SignupToken>) {
    const token = await this.signupPrepareTokenRepository.findOneOrFail({
      email,
    });
    return this.signupPrepareTokenRepository.update(token.id, dto);
  }

  async findByEmail(email: string) {
    return this.signupPrepareTokenRepository.findOneOrFail({
      email,
    });
  }

  async findByEmailWithoutFail(email: string) {
    return this.signupPrepareTokenRepository.findOne({
      email,
    });
  }

  async delete(id: string) {
    return this.signupPrepareTokenRepository.delete(id);
  }
}
