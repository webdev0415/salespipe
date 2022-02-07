import { IsEmail, IsString } from 'class-validator';

export class SetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
