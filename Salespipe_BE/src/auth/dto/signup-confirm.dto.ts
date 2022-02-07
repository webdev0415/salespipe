import { IsString, IsUUID } from 'class-validator';

export class SignupConfirmDto {
  @IsString()
  @IsUUID()
  code: string;
}
