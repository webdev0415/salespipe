import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as S3 from 'aws-sdk/clients/s3';
import { UploadFileDto } from './dto';
import { IS3Config } from './interface/IS3Config';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  private s3Config: IS3Config;
  private s3: S3;
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.s3Config = this.configService.get('s3');
    const { region, accessKeyId, secretAccessKey } = this.s3Config;
    this.s3 = new S3({ region, accessKeyId, secretAccessKey });
  }
  async uploadFile(dto: UploadFileDto): Promise<S3.ManagedUpload.SendData> {
    const fileStream = fs.createReadStream(dto.file.path);
    const uploadParams = {
      Bucket: this.s3Config.bucketName,
      Body: fileStream,
      Key: dto.file.filename,
    };
    return this.s3.upload(uploadParams).promise();
  }
  async removeFileLocally(filePath: string) {
    await fs.promises.unlink(filePath);
  }
}
