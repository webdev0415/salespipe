import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, compareSync } from 'bcrypt';
import { EmailAuthService } from 'src/email/email-auth.service';
import { User, UserType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { SignupEmailConfirmDto } from './dto/signup-email-confirm.dto';
import { SignupPrepareDto } from './dto/signup-prepare.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordTokenService } from './forgot-password-token.service';
import { SignupPrepareTokenService } from './signup-prepare-token.service';
import { SignupTokenService } from './signup-token.service';
import * as _ from 'lodash';
import { Roles } from 'src/shared/constant';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(SignupTokenService) private signupTokenService: SignupTokenService,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @Inject(SignupPrepareTokenService)
    private signupPrepareTokenService: SignupPrepareTokenService,
    @Inject(ForgotPasswordTokenService)
    private forgotPasswordTokenService: ForgotPasswordTokenService,
    @Inject(EmailAuthService) private emailAuthService: EmailAuthService,
  ) {}

  async signupEmailPrepare(dto: SignupPrepareDto) {
    const userExists = await this.usersService.findByEmailWithoutFail(
      dto.email,
    );
    if (userExists) {
      console.log("user exist")
      throw new NotFoundException('This email is already in use');
    }
    const tokenExist =
      await this.signupPrepareTokenService.findByEmailWithoutFail(dto.email);
    if (tokenExist) {
      console.log("token exist")
      await this.emailAuthService.signupEmailPrepare({
        email: dto.email,
        code: tokenExist.code,
      });
    } else {
      const token = await this.signupPrepareTokenService.create(dto.email);
      await this.emailAuthService.signupEmailPrepare({
        email: dto.email,
        code: token.code,
      });
    }
  }

  async signupEmailConfirm(dto: SignupEmailConfirmDto) {
    const token = await this.signupPrepareTokenService.findByEmail(dto.email);
    if (!token || token.code !== dto.code) {
      throw new NotFoundException('Signup token not found');
    } else if (token.expiryDate < new Date()) {
      throw new BadRequestException('Signup token expired');
    }

    // this.signupPrepareTokenService.delete(token.id);

    const user: any = {
      ..._.omit(dto),
      isActive: true,
      username: dto.email.split('@')[0],
    };

    // switch (dto.type) {
    //   case UserType.SDR:
    //     user.roles = [
    //       {
    //         id: '90df268d-0947-11ec-9b25-0242ac140002',
    //       },
    //     ];
    //     break;
    //   case UserType.HIRER:
    //     user.roles = [
    //       {
    //         id: '0378cee7-0948-11ec-9b25-0242ac140002',
    //       },
    //     ];
    //     break;
    // }

    await this.emailAuthService.signupEmailConfirm({
      email: dto.email,
    });

    return this.usersService.create(user);
  }

  async signup(dto: SignUpDto) {
    const user: any = { ...dto };
    switch (dto.type) {
      case UserType.SDR:
        user.roles = [
          {
            id: '90df268d-0947-11ec-9b25-0242ac140002',
          },
        ];
        break;
      case UserType.HIRER:
        user.roles = [
          {
            id: '0378cee7-0948-11ec-9b25-0242ac140002',
          },
        ];
        break;
    }

    const result = await this.usersService.create(user);
    const token = await this.signupTokenService.create(result.id);
    await this.emailAuthService.createdAccount({
      email: dto.email,
      code: token.code,
    });
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const isCorrect = await compare(dto.password, user.password);
    return isCorrect ? user : null;
  }

  async sign(user: User) {
    const dbUser = await this.usersService.findByEmail(user.email);
    const payload = {
      email: dbUser.email,
      sub: dbUser.id,
      roles: (dbUser?.roles || [Roles.NOROLE]).map((r) => r.code),
    };
    return {
      email: payload.email,
      roles: payload.roles,
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(code: string) {
    return this.signupTokenService.verify(code);
  }

  async setPassword(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user.password) {
      throw new NotFoundException('Password already set');
    } else {
      const role = await this.rolesRepository.findOneOrFail({ code: 'NOROLE' });
      user.roles.push(role);
      await this.usersService.updatePassword(user.id, { ...user, password });
      await this.emailAuthService.createdAccountNotifyAdmin({
        email: user.email,
      });
    }
  }

  async forgotPasswordRequest(email: string) {
    const user = await this.usersService.findByEmail(email);
    const token = await this.forgotPasswordTokenService.create(user.id);
    await this.emailAuthService.forgotPasswordRequest({
      email,
      code: token.code,
    });
  }

  async forgotPasswordChange(dto: ForgotPasswordDto) {
    await this.forgotPasswordTokenService.changePassword(dto);
    return this.emailAuthService.changedPassword({
      email: dto.email,
    });
  }

  async changePassword(dto: ChangePasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!compareSync(dto.oldPassword, user.password)) {
      throw new NotFoundException('User not found');
    } else {
      await this.usersService.updatePassword(user.id, {
        password: dto.password,
      });
      return this.emailAuthService.changedPassword({
        email: dto.email,
      });
    }
  }
}
