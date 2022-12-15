import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, FeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
