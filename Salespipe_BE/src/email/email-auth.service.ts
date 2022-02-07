import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import {
  ChangedPasswordDto,
  ChangePasswordRequestDto,
  CreatedAcccountDto,
  ForgotPasswordRequestDto,
  VerifiedAcccountDto,
} from './dto';
import { NewContractDTO } from './dto/new-contract.dto';
import { SignupEmailConfirmDto } from './dto/signup-email-confirm.dto';
import { SignupEmailPrepareDto } from './dto/signup-email-prepare.dto';
import { IEmailConfig } from './interface/IEmailConfig';

@Injectable()
export class EmailAuthService {
  private emailConfig: IEmailConfig;

  constructor(
    private readonly mailService: MailService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.emailConfig = this.configService.get('emailMarco');
  }

  async signupEmailPrepare(dto: SignupEmailPrepareDto, from?: string) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: dto.email,
      templateId: this.emailConfig.templates.signupEmailPrepareId,
      dynamicTemplateData: dto,
    });
  }

  async signupEmailConfirm(dto: SignupEmailConfirmDto, from?: string) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: dto.email,
      templateId: this.emailConfig.templates.signupEmailConfirmId,
      dynamicTemplateData: dto,
    });
  }

  async createdAccount(dto: CreatedAcccountDto, from?: string) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: dto.email,
      templateId: this.emailConfig.templates.createdAccountId,
      dynamicTemplateData: dto,
    });
  }

  async createdAccountNotifyAdmin(
    dto: Partial<CreatedAcccountDto>,
    from?: string,
  ) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: this.emailConfig.salesPipeEmail,
      templateId: this.emailConfig.templates.createdAccountId,
      dynamicTemplateData: dto,
    });
  }

  async verifiedAccount(dto: VerifiedAcccountDto, from?: string) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: dto.email,
      templateId: this.emailConfig.templates.verifiedAccountId,
      dynamicTemplateData: dto,
    });
  }

  async changedPassword(dto: ChangedPasswordDto, from?: string) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: dto.email,
      templateId: this.emailConfig.templates.changedPasswordId,
      dynamicTemplateData: dto,
    });
  }

  async changePasswordRequest(dto: ChangePasswordRequestDto, from?: string) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: dto.email,
      templateId: this.emailConfig.templates.changePasswordRequestId,
      dynamicTemplateData: dto,
    });
  }

  async forgotPasswordRequest(dto: ForgotPasswordRequestDto, from?: string) {
    return this.mailService.send({
      from: from || this.emailConfig.defaultSender,
      to: dto.email,
      templateId: this.emailConfig.templates.forgotPasswordRequestId,
      dynamicTemplateData: dto,
    });
  }

  async newContractDTORequest(dto: NewContractDTO) {
    return this.mailService.send({
      from: this.emailConfig.salesPipeEmail,
      to: this.emailConfig.salesPipeEmail,
      templateId: this.emailConfig.templates.newContract,
      dynamicTemplateData: dto,
    });
  }
}
