import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { UserType } from 'src/users/entities/user.entity';

export class SignupEmailConfirmDto {
  @IsUUID()
  code: string;

  // @IsEnum(UserType)
  // type: UserType.SDR | UserType.HIRER;

  // @IsString()
  // username: string;

  @IsEmail()
  email: string;

  // @IsString()
  // password: string;

  // @IsString()
  // firstName: string;

  // @IsString()
  // lastName: string;
}
