import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @ApiProperty()
  @IsNotEmpty()
  file: Express.Multer.File;
}
