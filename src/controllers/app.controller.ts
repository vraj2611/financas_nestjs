import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { LocalGuard } from '../security/local.strategy';
import { Public } from 'src/security/jwt.guard';

@Controller()
export class AppController {

    constructor(private serv: SecurityService) { }

    @Public()
    @Get()
    welcome() {
        return {titulo:"Welcome to Finance API", hora: new Date()}
    }

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

    @Get('test')
    test(@Request() req) {
        console.log(req.rawHeaders);
        return {"OK": 1};
    }

}