import { AllExceptionsFilter } from './shares/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './shares/filters/http-exception.filter';
import { TransformInterceptor } from './shares/interceptors/transform.interceptor';
import { LoggingInterceptor } from './shares/interceptors/logging.interceptor';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureModule } from './feature/feature.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    FeatureModule,
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule { }
