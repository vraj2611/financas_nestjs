import { Controller, Post, UseGuards, Get, Body, Req, Param } from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/security/public.decorator';
import { LocalGuard } from 'src/security/local.guard';

@Controller()
export class AppController {

    constructor(private serv: SecurityService) { }

    @Public()
    @Get()
    welcome() {
        return {message:'Welcome to Finance API', time: new Date()}
    }

    @Throttle(1, 2)
    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req, @Body() dto) {
            return this.serv.createJwt({ id: req.user.id })
    }

    @Throttle(1, 2)
    @Get('refresh_token')
    async renewToken(@Req() req) {
        return this.serv.createJwt({ id: req.user.id })
    }

}