import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class SignupEmailPrepareDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'c218f833-6a70-4034-9b5f-a5b6c51c8571',
  })
  @IsNotEmpty()
  @IsUUID()
  code: string;
}
