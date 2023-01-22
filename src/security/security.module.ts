import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityService } from './security.service';
import { LoggingService } from './logging.service';
import { JwtStrategy } from './guards/jwt-auth.guard';
import { LocalStrategy } from './guards/local-auth.guard';
import { ServicesModule } from 'src/services/services.module';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [
    ServicesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [SecurityService, LoggingService, LocalStrategy, JwtStrategy],
  exports: [SecurityService],
})
export class SecurityModule {}
