import { Controller, Post, UseGuards, Get, Body, Req } from '@nestjs/common';
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

    @Throttle(1, 5)
    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req) {
        try {
            return this.serv.createJwt({ id: req.user.id })
        } catch (error) {
            return error;
        }
    }

}