import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('avatar', { dest: './uploads' }))
  async uploadSingleImage(@UploadedFile() file: Express.Multer.File) {
    const res = await this.filesService.uploadFile({ file });
    await this.filesService.removeFileLocally(file.path);
    return res;
  }

  @Public()
  @Post('uploadVideo')
  @UseInterceptors(FileInterceptor('video', { dest: './uploads' }))
  async uploadSingleVideo(@UploadedFile() file: Express.Multer.File) {
    const res = await this.filesService.uploadFile({ file });
    await this.filesService.removeFileLocally(file.path);
    return res;
  }
}
