import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import { EmailAuthService } from './email-auth.service';
import { IEmailConfig } from './interface/IEmailConfig';

@Module({
  providers: [
    {
      provide: MailService,
      useFactory: (configService: ConfigService) => {
        const service = new MailService();
        const emailConfig: IEmailConfig = configService.get('emailMarco');
        service.setApiKey(emailConfig.apiKey);

        return service;
      },
      inject: [ConfigService],
    },
    EmailAuthService,
  ],
  exports: [EmailAuthService],
})
export class EmailModule {}
