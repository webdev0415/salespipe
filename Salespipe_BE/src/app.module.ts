import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { roles } from './app.roles';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ACAuthGuard } from './auth/guards/ac-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CompanyProfilesModule } from './company-profiles/company-profiles.module';
import configuration from './config/configuration';
import { CoreModule } from './core/core.module';
import { TypeormExceptionFilter } from './core/filters/typeorm-exception.filter';
import { IndustriesModule } from './industries/industries.module';
import { SharedModule } from './shared/shared.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ContractsModule } from './contracts/contracts.module';
import { ContractTermsModule } from './contract-terms/contract-terms.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const env = process.env.NODE_ENV;
        const conf =
          env === 'test'
            ? configService.get('db.test')
            : configService.get('db.mysql');
        if (env === 'production') {
          return {
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            ...conf,
          };
        } else {
          return {
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            logging: true,
            ...conf,
          };
        }
      },
      inject: [ConfigService],
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    UsersModule,
    FilesModule,
    CoreModule,
    SharedModule,
    UserProfilesModule,
    IndustriesModule,
    CompanyProfilesModule,
    ContractsModule,
    ContractTermsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },

    // Guards
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACAuthGuard,
    },

    // Filters
    {
      provide: APP_FILTER,
      useClass: TypeormExceptionFilter,
    },

    // Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
