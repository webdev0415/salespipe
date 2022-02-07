import { IsEmail } from 'class-validator';

export class SignupPrepareDto {
  @IsEmail()
  email: string;
}
