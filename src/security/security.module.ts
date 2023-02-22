import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityService } from './security.service';
import { LoggingService } from './logging.service';
import { ServicesModule } from 'src/services/services.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.estrategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [
        ServicesModule,
        PassportModule,
        JwtModule,
        ThrottlerModule.forRoot({ ttl: 10, limit: 10 })
    ],
    controllers: [],
    providers: [
        SecurityService,
        LoggingService,
        LocalStrategy,
        JwtStrategy,
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_GUARD, useClass: JwtGuard }
    ],
    exports: [SecurityService],
})
export class SecurityModule { }
