import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  oldPassword: string;

  @IsString()
  password: string;
}
