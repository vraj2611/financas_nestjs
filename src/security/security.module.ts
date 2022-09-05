import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { SecurityService } from './security.service';
import { LoggingService } from './logging.service';
import { JwtStrategy } from './guards/jwt-auth.guard';
import { LocalStrategy } from './guards/local-auth.guard';
import { SecurityController } from './security.controller';
import * as process from 'process';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [SecurityController],
  providers: [SecurityService, LoggingService, LocalStrategy, JwtStrategy],
  exports: [SecurityService],
})
export class SecurityModule {}
