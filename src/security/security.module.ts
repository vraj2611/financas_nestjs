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

@Module({
    imports: [
        ServicesModule,
        PassportModule,
        JwtModule
    ],
    controllers: [],
    providers: [
        SecurityService,
        LoggingService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        }
    ],
    exports: [SecurityService],
})
export class SecurityModule { }
