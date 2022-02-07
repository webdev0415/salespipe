import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { Actions, Resources } from 'src/shared/constant';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { ForgotPasswordRequestDto } from './dto/forgot-password-request.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { LoginDto } from './dto/login.dto';
import { SignupConfirmDto } from './dto/signup-confirm.dto';
import { SignupEmailConfirmDto } from './dto/signup-email-confirm.dto';
import { SignupPrepareDto as SignupEmailPrepareDto } from './dto/signup-prepare.dto';
import { SignUpDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Public()
  @Post('signup/email-prepare')
  signupEmailPrepare(@Body() dto: SignupEmailPrepareDto) {
    console.log("dto", dto)
    return this.authService.signupEmailPrepare(dto);
  }

  @Public()
  @Post('signup/email-confirm')
  signupEmailConfirm(@Body() dto: SignupEmailConfirmDto) {
    return this.authService.signupEmailConfirm(dto);
  }

  @Public()
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signup/confirm')
  signupConfirm(@Body() dto: SignupConfirmDto) {
    return this.authService.verify(dto.code);
  }

  @Public()
  @Post('set-password')
  async setPassword(@Body() dto: SetPasswordDto) {
    await this.authService.setPassword(dto.email, dto.password);
    const maybeUser = await this.authService.login({
      email: dto.email,
      password: dto.password,
    });
    if (maybeUser) {
      return this.authService.sign(maybeUser);
    }
    return;
  }

  @Public()
  @Post('forgot-password-request')
  forgotPasswordRequest(@Body() dto: ForgotPasswordRequestDto) {
    return this.authService.forgotPasswordRequest(dto.email);
  }

  @Public()
  @Post('forgot-password-change')
  async forgotPasswordChange(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPasswordChange(dto);
  }

  @UseRoles({
    resource: Resources.AUTH,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @Post('change-password')
  async changePassword(
    @Body() dto: ChangePasswordRequestDto,
    @CurrentUser() user: User,
  ) {
    return await this.authService.changePassword({
      ...dto,
      email: user.email,
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const maybeUser = await this.authService.login(dto);

    if (maybeUser) {
      return this.authService.sign(maybeUser);
    }
    return;
  }

  @UseRoles({
    resource: Resources.AUTH,
    action: Actions.READ,
    possession: 'own',
  })
  @Get('me')
  async getProfile(@Request() req) {
    return await this.authService.sign(req.user);
  }
}
