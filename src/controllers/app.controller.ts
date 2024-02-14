import { Controller, Post, UseGuards, Get, Body, Req } from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/security/public.decorator';
import { LocalGuard } from 'src/security/local.guard';
import { DoNotRequireRole } from 'src/security/permission.decorator';
import { LoginUserDto } from 'src/dtos/loginUserDto.class';

@Controller()
export class AppController {

    constructor(private serv: SecurityService) { }

    @Public()
    @Get()
    welcome() {
        return { message: 'Welcome to Finance API', time: new Date() }
    }

    @Throttle(1, 2)
    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req, @Body() LoginUserDto) {
        return this.serv.createJwt({ id: req.user.id })
    }

    @Throttle(1, 2)
    @DoNotRequireRole()
    @Get('refresh_token')
    async renewToken(@Req() req) {
        return this.serv.createJwt({ id: req.user.id })
    }

    @Get('insecure')
    insecureRoute() {
        return "ok"
    }
}