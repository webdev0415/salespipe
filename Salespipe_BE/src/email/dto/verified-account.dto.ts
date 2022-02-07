import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifiedAcccountDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
