import { IsEmail, IsString, IsUUID } from 'class-validator';

export class ForgotPasswordDto {
  @IsUUID()
  code: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
