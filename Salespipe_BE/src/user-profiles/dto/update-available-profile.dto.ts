import { IsBoolean } from 'class-validator';

export class UpdateAvailableUserProfileDto {
  @IsBoolean()
  isAvailable: boolean;
}
