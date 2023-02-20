import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { LocalGuard } from '../security/local.strategy';
import { Public } from 'src/security/jwt.guard';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from 'src/dtos/loginDto.class';

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
    async login(@Body() dto: LoginDto) {
        try {
            return this.serv.createJwt({ email: dto.email })
        } catch (error) {
            return error;
        }
    }

    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user);
        return "ok";
    }


}