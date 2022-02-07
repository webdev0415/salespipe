import { IsBoolean, IsString } from 'class-validator';

export class UpdateVerifiedUserProfileDto {
  @IsBoolean()
  isVerified: boolean;
  @IsString()
  userId: string;
}
