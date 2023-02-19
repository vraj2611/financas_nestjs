import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityService } from './security.service';
import { LoggingService } from './logging.service';
import { JwtStrategy } from './jwt-auth.guard';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    ServicesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'test',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [SecurityService, LoggingService, JwtStrategy],
  exports: [SecurityService],
})
export class SecurityModule {}
