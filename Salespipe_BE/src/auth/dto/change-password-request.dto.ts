import { IsString } from 'class-validator';

export class ChangePasswordRequestDto {
  @IsString()
  oldPassword: string;

  @IsString()
  password: string;
}
