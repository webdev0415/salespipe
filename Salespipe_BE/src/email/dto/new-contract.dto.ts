import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class NewContractDTO {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  hirerEmail: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  hirerId: string;

  @ApiProperty()
  @IsString()
  hirerName: string;

  @ApiProperty()
  @IsString()
  hirerPhone: string;

  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsEmail()
  hireeEmail: string;
  @ApiProperty()
  @IsUUID()
  hireeId: string;
  @ApiProperty()
  @IsString()
  hireeName: string;
  @ApiProperty()
  @IsString()
  hireePhone: string;
}
