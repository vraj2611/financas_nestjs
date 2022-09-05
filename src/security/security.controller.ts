import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SecurityService } from './security.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class SecurityController {
    constructor(private readonly secServ: SecurityService) { }

    @Get()
    test(){
        return "Rota ok"
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.secServ.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
