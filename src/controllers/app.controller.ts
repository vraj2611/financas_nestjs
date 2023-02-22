import { Controller, Post, UseGuards, Get, Body, Req, Param } from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { LocalGuard } from '../security/local.strategy';
import { Public } from 'src/security/jwt.guard';
import { Throttle } from '@nestjs/throttler';
import { LoginUserDto } from 'src/dtos/loginUserDto.class';

@Controller()
export class AppController {

    constructor(private serv: SecurityService) { }

    @Public()
    @Get()
    welcome() {
        return {message:'Welcome to Finance API', time: new Date()}
    }

    @Public()
    @Get('crypt/:txt')
    async crypt(@Param('txt') txt:string) {
        const enc = await this.serv.encrypt_text(txt);
        const dec = await this.serv.decrypt_text(enc);
        return {enc, dec}
    }

    @Throttle(1, 2)
    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req) {
            return this.serv.createJwt({ id: req.user.id })
    }

    @Throttle(1, 2)
    @Get('refresh_token')
    async renewToken(@Req() req) {
        return this.serv.createJwt({ id: req.user.id })
    }

}