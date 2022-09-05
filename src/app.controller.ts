import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './security/guards/jwt-auth.guard';
import { LocalAuthGuard } from './security/guards/local-auth.guard';
import { AppService } from './app.service';
import { SecurityService } from './security/security.service';
import * as process from 'process';

@Controller()
export class AppController {
  constructor(private readonly secServ: SecurityService, private appServ: AppService) {}


@Get()
testenv(){
    return process.env.GOOGLE_CLOUD_PROJECT + process.env.JWT_SECRET
}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.secServ.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
