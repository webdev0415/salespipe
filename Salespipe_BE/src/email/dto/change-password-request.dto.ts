import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ChangePasswordRequestDto {
  @ApiProperty({
    example: 'secret',
  })
  @IsUUID()
  code: string;

  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
