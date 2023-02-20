import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { LocalGuard } from '../security/local.strategy';
import { Public } from 'src/security/jwt.guard';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {

    constructor(private serv: SecurityService) { }

    @Public()
    @Get()
    welcome() {
        return {message:'Welcome to Finance API', time: new Date()}
    }

    @Throttle(1, 5)
    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Request() req) {
        try {
            return this.serv.createJwt({ email: req.user.email })
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user);
        return "ok";
    }


}