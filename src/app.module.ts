import { AllExceptionsFilter } from './shares/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './shares/filters/http-exception.filter';
import { TransformInterceptor } from './shares/interceptors/transform.interceptor';
import { LoggingInterceptor } from './shares/interceptors/logging.interceptor';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureModule } from './modules/feature/feature.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AdminController } from './modules/admin/admin.controller';
import { AdminService } from './modules/admin/admin.service';
import { AdminModule } from './modules/admin/admin.module';
import { ManageMonthIncomeService } from './modules/manage-month-income/manage-month-income.service';
import { ManageMonthIncomeModule } from './modules/manage-month-income/manage-month-income.module';
import { TaskService } from './modules/task/task.service';
import { TaskController } from './modules/task/task.controller';
import { TaskModule } from './modules/task/task.module';
import { TaskScheduleModule } from './modules/task-schedule/task-schedule.module';

const logger = new Logger();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
      {
        dbName: process.env.MONGO_DATABASE_NAME,
      }
    ),
    AuthModule,
    UsersModule,
    FeatureModule,
    AdminModule,
    ManageMonthIncomeModule,
    TaskModule,
    TaskScheduleModule,
  ],
  controllers: [AppController, AdminController, TaskController],
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
    AdminService,
    ManageMonthIncomeService,
    TaskService,
  ],
})
export class AppModule { }
