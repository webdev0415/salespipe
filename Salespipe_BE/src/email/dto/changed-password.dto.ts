import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangedPasswordDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
